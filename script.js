let score = 0;
let specialNumber = 0;
let gameOver = false;
let ranking = [];

const scoreEl = document.getElementById('score');
const specialEl = document.getElementById('special');
const diceValueEl = document.getElementById('diceValue');
const messageEl = document.getElementById('message');
const rankingListEl = document.getElementById('rankingList');
const diceImg = document.getElementById('diceImg');

const rollBtn = document.getElementById('rollBtn');
const restartBtn = document.getElementById('restartBtn');

function generateSpecialNumber() {
  // 특별 숫자는 1~6 중 하나만 (0은 폭탄)
  specialNumber = Math.floor(Math.random() * 6) + 1;
  specialEl.textContent = specialNumber;
}

function rollDice() {
  if (gameOver) return;

  // 🎲 0~6 사이의 숫자를 생성 (0은 폭탄)
  const dice = Math.floor(Math.random() * 7);
  diceValueEl.textContent = dice === 0 ? "💣 폭탄" : dice;

  // 💣 0이면 폭탄 → 게임 종료
  if (dice === 0) {
    gameOver = true;
    messageEl.textContent = "💥 폭탄! 게임 종료!";
    diceImg.src = "images/bomb.png";
    updateRanking();
    return;
  }

  // 🎲 주사위 눈 이미지 표시 (1~6)
  diceImg.src = `images/dice${dice}.png`;

  // ⭐ 특별 숫자일 경우 점수 2배
  if (dice === specialNumber) {
    score += dice * 2;
    messageEl.textContent = "⭐ 특별 숫자! 점수 2배!";
  } else {
    score += dice;
    messageEl.textContent = "";
  }

  scoreEl.textContent = score;
  generateSpecialNumber();
}

function restartGame() {
  score = 0;
  gameOver = false;
  scoreEl.textContent = score;
  diceValueEl.textContent = "-";
  messageEl.textContent = "";
  diceImg.src = "images/dice1.png";
  generateSpecialNumber();
}

function updateRanking() {
  // 💬 유저 이름 입력
  const playerName = prompt("이름을 입력하세요:", "플레이어");
  const nameToSave = playerName && playerName.trim() !== "" ? playerName : "이름없음";

  // 이름 + 점수 저장
  ranking.push({ name: nameToSave, score: score });

  // 높은 점수 순 정렬
  ranking.sort((a, b) => b.score - a.score);

  // 상위 10명만 유지
  ranking = ranking.slice(0, 10);

  // 목록 갱신
  rankingListEl.innerHTML = "";
  ranking.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${entry.name} — ${entry.score}점`;
    rankingListEl.appendChild(li);
  });
}

generateSpecialNumber();

rollBtn.addEventListener('click', rollDice);
restartBtn.addEventListener('click', restartGame);


