class GaltonBoard {
    constructor() {
        this.canvas = document.getElementById('galtonBoard');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // 게임 상태
        this.isRunning = false;
        this.isPaused = false;
        this.balls = [];
        this.pins = [];
        this.bins = [];
        this.ballCount = 10;
        this.speed = 3;
        this.droppedCount = 0;
        this.totalBalls = 0;
        
        // 물리 상수
        this.gravity = 0.3;
        this.friction = 0.95;
        this.bounceForce = 0.4;
        
        // 색상 팔레트
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'
        ];
        
        this.initializeBoard();
        this.setupEventListeners();
        this.animate();
    }
    
    initializeBoard() {
        // 핀 생성 (갈톤보드 형태)
        this.pins = [];
        const pinRows = 12;
        const pinSpacing = 50;
        const startY = 100;
        
        for (let row = 0; row < pinRows; row++) {
            const pinsInRow = row + 1;
            const startX = this.width / 2 - (pinsInRow - 1) * pinSpacing / 2;
            
            for (let col = 0; col < pinsInRow; col++) {
                this.pins.push({
                    x: startX + col * pinSpacing,
                    y: startY + row * 40,
                    radius: 6,
                    row: row,
                    col: col
                });
            }
        }
        
        // 바닥 빈 생성
        this.bins = [];
        const binCount = pinRows + 1;
        const binWidth = 50;
        const binStartX = this.width / 2 - (binCount * binWidth) / 2;
        
        for (let i = 0; i < binCount; i++) {
            this.bins.push({
                x: binStartX + i * binWidth,
                y: this.height - 100,
                width: binWidth,
                height: 80,
                balls: [],
                count: 0
            });
        }
    }
    
    setupEventListeners() {
        // 슬라이더 이벤트
        const ballCountSlider = document.getElementById('ballCount');
        const speedSlider = document.getElementById('speed');
        const ballCountValue = document.getElementById('ballCountValue');
        const speedValue = document.getElementById('speedValue');
        
        ballCountSlider.addEventListener('input', (e) => {
            this.ballCount = parseInt(e.target.value);
            ballCountValue.textContent = this.ballCount;
        });
        
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            speedValue.textContent = this.speed;
        });
        
        // 버튼 이벤트
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startSimulation();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetSimulation();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
    }
    
    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.totalBalls = this.ballCount;
        this.droppedCount = 0;
        this.ballDropInterval = 0;
        
        // 버튼 상태 업데이트
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').innerHTML = '🔄 진행중...';
    }
    
    resetSimulation() {
        this.isRunning = false;
        this.isPaused = false;
        this.balls = [];
        this.droppedCount = 0;
        this.totalBalls = 0;
        
        // 빈 초기화
        this.bins.forEach(bin => {
            bin.balls = [];
            bin.count = 0;
        });
        
        // 버튼 상태 리셋
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerHTML = '🚀 시작하기';
        document.getElementById('pauseBtn').innerHTML = '⏸️ 일시정지';
        
        // 통계 리셋
        this.updateStats();
    }
    
    togglePause() {
        if (!this.isRunning) return;
        
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.innerHTML = this.isPaused ? '▶️ 계속하기' : '⏸️ 일시정지';
    }
    
    createBall() {
        const ball = {
            x: this.width / 2 + (Math.random() - 0.5) * 20,
            y: 50,
            vx: 0,
            vy: 0,
            radius: 8,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            trail: [],
            bounceCount: 0
        };
        
        this.balls.push(ball);
        this.droppedCount++;
    }
    
    updatePhysics() {
        if (this.isPaused) return;
        
        // 새 공 떨어뜨리기
        if (this.isRunning && this.droppedCount < this.totalBalls) {
            this.ballDropInterval++;
            if (this.ballDropInterval >= (60 / this.speed)) {
                this.createBall();
                this.ballDropInterval = 0;
            }
        }
        
        // 공 물리 시뮬레이션
        this.balls.forEach((ball, index) => {
            // 중력 적용
            ball.vy += this.gravity;
            
            // 속도에 따른 위치 업데이트
            ball.x += ball.vx;
            ball.y += ball.vy;
            
            // 공기 저항 (마찰력) 적용
            ball.vx *= 0.98;
            ball.vy *= 0.99;
            
            // 궤적 추가
            ball.trail.push({ x: ball.x, y: ball.y });
            if (ball.trail.length > 5) {
                ball.trail.shift();
            }
            
            // 핀과의 충돌 감지
            this.pins.forEach(pin => {
                const dx = ball.x - pin.x;
                const dy = ball.y - pin.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < ball.radius + pin.radius) {
                    // 충돌 방향 계산
                    const angle = Math.atan2(dy, dx);
                    
                    // 공을 핀 밖으로 밀어내기
                    const overlap = (ball.radius + pin.radius) - distance;
                    ball.x += Math.cos(angle) * overlap;
                    ball.y += Math.sin(angle) * overlap;
                    
                    // 반사 속도 계산
                    const bounceAngle = angle + (Math.random() - 0.5) * 0.3;
                    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                    
                    ball.vx = Math.cos(bounceAngle) * speed * this.bounceForce;
                    ball.vy = Math.sin(bounceAngle) * speed * this.bounceForce;
                    
                    // 최소 수평 속도 보장 (더 부드럽게)
                    if (Math.abs(ball.vx) < 0.5) {
                        ball.vx = (Math.random() > 0.5 ? 0.5 : -0.5) * 1.5;
                    }
                    
                    ball.bounceCount++;
                }
            });
            
            // 벽과의 충돌
            if (ball.x - ball.radius < 50) {
                ball.x = 50 + ball.radius;
                ball.vx = Math.abs(ball.vx) * 0.5;
            }
            if (ball.x + ball.radius > this.width - 50) {
                ball.x = this.width - 50 - ball.radius;
                ball.vx = -Math.abs(ball.vx) * 0.5;
            }
            
            // 빈에 도달했는지 확인
            if (ball.y > this.height - 120) {
                // 어느 빈에 속하는지 계산
                const binIndex = Math.floor((ball.x - (this.width / 2 - (this.bins.length * 50) / 2)) / 50);
                const clampedIndex = Math.max(0, Math.min(this.bins.length - 1, binIndex));
                
                if (this.bins[clampedIndex]) {
                    this.bins[clampedIndex].balls.push(ball);
                    this.bins[clampedIndex].count++;
                    this.balls.splice(index, 1);
                }
            }
            
            // 화면 밖으로 나간 공 제거
            if (ball.y > this.height + 100) {
                this.balls.splice(index, 1);
            }
        });
        
        // 시뮬레이션 완료 확인
        if (this.isRunning && this.droppedCount >= this.totalBalls && this.balls.length === 0) {
            this.isRunning = false;
            document.getElementById('startBtn').disabled = false;
            document.getElementById('startBtn').innerHTML = '🚀 시작하기';
        }
    }
    
    draw() {
        // 캔버스 클리어
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 배경 그라디언트
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 핀 그리기
        this.pins.forEach(pin => {
            this.ctx.beginPath();
            this.ctx.arc(pin.x, pin.y, pin.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#495057';
            this.ctx.fill();
            this.ctx.strokeStyle = '#343a40';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // 핀에 반짝이는 효과
            this.ctx.beginPath();
            this.ctx.arc(pin.x - 2, pin.y - 2, pin.radius / 3, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.fill();
        });
        
        // 빈 그리기
        this.bins.forEach((bin, index) => {
            // 빈 테두리
            this.ctx.strokeStyle = '#495057';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(bin.x, bin.y, bin.width, bin.height);
            
            // 빈 배경
            this.ctx.fillStyle = 'rgba(108, 117, 125, 0.1)';
            this.ctx.fillRect(bin.x, bin.y, bin.width, bin.height);
            
            // 빈 안의 공들
            bin.balls.forEach((ball, ballIndex) => {
                const stackY = bin.y + bin.height - 16 - (ballIndex * 16);
                this.ctx.beginPath();
                this.ctx.arc(bin.x + bin.width / 2, stackY, 8, 0, Math.PI * 2);
                this.ctx.fillStyle = ball.color;
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            });
            
            // 빈 번호
            this.ctx.fillStyle = '#495057';
            this.ctx.font = 'bold 14px Nunito';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(bin.count.toString(), bin.x + bin.width / 2, bin.y + bin.height + 20);
        });
        
        // 떨어지는 공들 그리기
        this.balls.forEach(ball => {
            // 궤적 그리기
            if (ball.trail.length > 1) {
                this.ctx.strokeStyle = ball.color + '40';
                this.ctx.lineWidth = 4;
                this.ctx.beginPath();
                this.ctx.moveTo(ball.trail[0].x, ball.trail[0].y);
                for (let i = 1; i < ball.trail.length; i++) {
                    this.ctx.lineTo(ball.trail[i].x, ball.trail[i].y);
                }
                this.ctx.stroke();
            }
            
            // 공 그리기
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = ball.color;
            this.ctx.fill();
            
            // 공에 반짝이는 효과
            this.ctx.beginPath();
            this.ctx.arc(ball.x - 3, ball.y - 3, ball.radius / 3, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
            
            // 공 테두리
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        // 출발점 표시
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, 50, 12, 0, Math.PI * 2);
        this.ctx.fillStyle = '#28a745';
        this.ctx.fill();
        this.ctx.strokeStyle = '#155724';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // 출발점 텍스트
        this.ctx.fillStyle = '#155724';
        this.ctx.font = 'bold 16px Nunito';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('시작', this.width / 2, 30);
    }
    
    updateStats() {
        document.getElementById('droppedCount').textContent = this.droppedCount;
        
        const progress = this.totalBalls > 0 ? (this.droppedCount / this.totalBalls) * 100 : 0;
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    animate() {
        this.updatePhysics();
        this.draw();
        this.updateStats();
        requestAnimationFrame(() => this.animate());
    }
}

// 페이지 로드 시 갈톤보드 초기화
document.addEventListener('DOMContentLoaded', () => {
    const galtonBoard = new GaltonBoard();
});

// 이스터 에그: 키보드 조작
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        document.getElementById('startBtn').click();
    } else if (e.code === 'KeyR') {
        e.preventDefault();
        document.getElementById('resetBtn').click();
    } else if (e.code === 'KeyP') {
        e.preventDefault();
        document.getElementById('pauseBtn').click();
    }
});