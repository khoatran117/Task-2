const n = 3;

const Team = {
  // Team A for X
  A: {
    value: 0,
    name: "TEAM A",
  },
  // Team B for O
  B: {
    value: 1,
    name: "TEAM B",
  },
};

let table = [];

const resetTable = () => {
  table = [];
  for (let i = 0; i < n; i++) {
    table.push(Array(n).fill(-1));
  }

  tableTicTac.innerHTML = "";
  table.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      const clone = cardTable.cloneNode(true);
      clone.id = `table-${rowIndex}-${colIndex}`;
      clone.addEventListener("click", () => {
        onMove({ row: rowIndex, col: colIndex });
      });

      tableTicTac.appendChild(clone);
    });
  });
};

let count = 0;

const tableTicTac = document.getElementById("table");
const cardTable = document.getElementById("card");
const xCard = document.getElementById("x-card");
const oCard = document.getElementById("o-card");
const winTxt = document.getElementById("win-text");
const resetBtn = document.getElementById("reset-btn");
resetTable();

const onMove = (position) => {
  if (table[position.row][position.col] !== -1 || count >= n * n) {
    return;
  }

  let teamValue = count % 2;

  count++;

  const index = document.getElementById(
    `table-${position.row}-${position.col}`
  );

  index.innerHTML = "";

  if (teamValue === Team.A.value) {
    const clone = xCard.cloneNode(true);
    index.appendChild(clone);
    table[position.row][position.col] = Team.A.value;
    checkForWin(teamValue, {
      row: position.row,
      col: position.col,
    });
    autoMove();
  } else {
    const clone = oCard.cloneNode(true);
    index.appendChild(clone);
    table[position.row][position.col] = Team.B.value;
    checkForWin(teamValue, {
      row: position.row,
      col: position.col,
    });
  }
};

const checkHorizon = (teamValue, position) => {
  for (let i = 0; i < n; i++) {
    if (table[i][position.col] != teamValue) {
      return false;
    }
  }

  return true;
};

const checkVertical = (teamValue, position) => {
  for (let i = 0; i < n; i++) {
    if (table[position.row][i] != teamValue) {
      return false;
    }
  }

  return true;
};

const checkSide = (teamValue) => {
  for (let i = 0; i < n; i++) {
    if (table[i][i] != teamValue) {
      return false;
    }
  }

  return true;
};

const checkSideReverse = (teamValue) => {
  for (let i = 0; i < n; i++) {
    if (table[i][n - i - 1] != teamValue) {
      return false;
    }
  }

  return true;
};

const checkComplete = () => {
  return count === n * n;
};

const checkForDraw = () => {
  if (checkComplete()) {
    alert("Hòa!");
    winTxt.innerHTML = `KẾT QUẢ HÒA`;
  }
};

const checkForWin = (teamValue, position) => {
  if (
    checkHorizon(teamValue, position) ||
    checkVertical(teamValue, position) ||
    checkSide(teamValue, position) ||
    checkSideReverse(teamValue, position)
  ) {
    alert(`Kết thúc! ${getTeamNameByValue(teamValue)} Thắng`);
    winTxt.innerHTML = `${getTeamNameByValue(teamValue)} CHIẾN THẮNG`;
    count = n * n + 1;
  } else {
    checkForDraw();
  }
};

const getTeamNameByValue = (value) => {
  switch (value) {
    case Team.A.value:
      return Team.A.name;
    case Team.B.value:
      return Team.B.name;
    default:
      return "";
  }
};

const autoMove = () => {
  if (count >= n * n) {
    return;
  }

  const randomPosition = () => {
    return {
      row: Math.floor(Math.random() * n),
      col: Math.floor(Math.random() * n),
    };
  };

  let position = randomPosition();

  while (table[position.row][position.col] !== -1) {
    position = randomPosition();
  }

  onMove(position);
};

const onReset = () => {
  winTxt.innerHTML = "";
  count = 0;
  resetTable();
};

resetBtn.addEventListener("click", () => {
  onReset();
});
