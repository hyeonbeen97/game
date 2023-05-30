function tetris() {
    const tetrisView = document.querySelector(".tetris__play .view ul");
    const line_rows = 20; //가로
    const line_cols = 12; //세로
    const blocks = {
        Tmino: [
            [
                [2, 1],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 2],
                [0, 1],
                [2, 1],
                [1, 1],
            ],
            [
                [2, 1],
                [1, 2],
                [1, 0],
                [1, 1],
            ],
        ],
        Imino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        ],
        Omino: [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
        ],
        Zmino: [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [1, 0],
                [0, 1],
                [1, 1],
                [0, 2],
            ],
        ],
        Smino: [
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
            [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
        ],
        Jmino: [
            [
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [2, 1],
            ],
        ],
        Lmino: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [0, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 0],
                [2, 1],
            ],
        ],
    };
    let score = 0;
    let duration = 500;
    let downInterval;
    let tempMovingItem;
    const movingItem = {
        //블록의 정보 변수
        type: "",
        direction: 0,
        top: 0,
        left: 4,
    };
    // 시작하기
    function init() {
        tempMovingItem = { ...movingItem };
        newLine(); //라인만들기
        generateNewBlock();
        renderBlocks(); //블록 만들기
    }
    // 라인 만들기
    function newLine() {
        for (let i = 0; i < line_rows; i++) {
            const li = document.createElement("li");
            const ul = document.createElement("ul");
            for (let j = 0; j < line_cols; j++) {
                const subLi = document.createElement("li");
                ul.prepend(subLi);
            }
            li.prepend(ul);
            tetrisView.prepend(li);
        }
    }
    // 블록 만들기
    function renderBlocks(moveType = "") {
        // console.log(movingItem.type);
        // console.log(movingItem.direction);
        // console.log(movingItem.top);
        // console.log(movingItem.left);
        // const type = movingItem.type;
        // const direction = movingItem.direction;
        // const top = movingItem.top;
        // const left = movingItem.left;
        const { type, direction, top, left } = tempMovingItem;
        // console.log(type, direction, top, left);
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove(type, "moving");
        });
        blocks[type][direction].some((block) => {
            const x = block[0] + left;
            const y = block[1] + top;
            // console.log({ tetrisView });
            const target = tetrisView.childNodes[y]
                ? tetrisView.childNodes[y].childNodes[0].childNodes[x]
                : null;
            const isAvailable = checkEmpty(target);
            if (isAvailable) {
                target.classList.add(type, "moving");
            } else {
                tempMovingItem = { ...movingItem };
                setTimeout(() => {
                    renderBlocks();
                    if (moveType === "top") {
                        seizeBlock();
                    }
                });
                return true;
            }
        });
        movingItem.left = left;
        movingItem.top = top;
        movingItem.direction = direction;
    }
    function seizeBlock() {
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach((moving) => {
            moving.classList.remove("moving");
            moving.classList.add("seized");
        });
        checkMatch();
    }
    function checkMatch() {
        const childNodes = Array.from(tetrisView.childNodes);
        childNodes.forEach((child) => {
            let matched = true;
            child.childNodes[0].childNodes.forEach((li) => {
                if (!li.classList.contains("seized")) {
                    matched = false;
                }
            });
            if (matched) {
                child.remove();
            }
        });
        const emptyLinesCount = line_rows - tetrisView.childElementCount;
        for (let i = 0; i < emptyLinesCount; i++) {
            const li = document.createElement("li");
            const ul = document.createElement("ul");
            for (let j = 0; j < line_cols; j++) {
                const subLi = document.createElement("li");
                ul.prepend(subLi);
            }
            li.prepend(ul);
            tetrisView.prepend(li);
        }
        generateNewBlock();
        checkGameOver();
    }
    function generateNewBlock() {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, duration);
        const blockArray = Object.entries(blocks);
        const randomIndex = Math.floor(Math.random() * blockArray.length);
        movingItem.type = blockArray[randomIndex][0];
        movingItem.top = 0;
        movingItem.left = 4;
        movingItem.direction = 0;
        tempMovingItem = { ...movingItem };
        renderBlocks();
    }
    function checkEmpty(target) {
        if (!target || target.classList.contains("seized")) {
            return false;
        }
        return true;
    }
    // 블록 움직이기
    function moveBlock(moveType, amount) {
        tempMovingItem[moveType] += amount;
        renderBlocks(moveType);
    }
    // 모양 변경하기
    function changeDirection() {
        const direction = tempMovingItem.direction;
        direction === 3
            ? (tempMovingItem.direction = 0)
            : (tempMovingItem.direction += 1);
        renderBlocks();
    }

    // 스페이스바 누르기
    function dropBlock() {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock("top", 1);
        }, 10);
    }
    // 게임 스타트
    function gameStart() {
        stopGame = false;
        tetrisStart.style.display = "none";
        tetrisTitle.style.display = "block";
        tetrisPlay.style.display = "block";
        tetrisText.style.display = "block";
        tetrisMethod.style.display = "block";
        generateNewBlock();
        renderBlocks();
        setTime();
    }

    function gameReset() {
        clearInterval(setGameTime);
        score = 0;
        time = 0;
        stopGame = true;
        tetrisTime.innerText = time;
        scoreDisplay.innerText = score;

        const tetrisMinos = document.querySelectorAll(
            ".tetris__play .view ul li ul li"
        );
        tetrisMinos.forEach((minos) => {
            minos.className = "";
        });
    }

    document
        .querySelector(".tetris__result button")
        .addEventListener("click", () => {
            tetrisStart.style.display = "block";
            tetrisResult.style.display = "none";
            gameReset();
        });

    document
        .querySelector(".tetris__start button")
        .addEventListener("click", () => {
            gameStart();
        });

    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                moveBlock("left", 1);
                break;
            case 37:
                moveBlock("left", -1);
                break;
            case 40:
                moveBlock("top", 1);
                break;
            case 32:
                dropBlock();
                break;
            case 38:
                changeDirection();
                break;
            default:
                break;
        }
    });

    init();
}
export default tetris;
