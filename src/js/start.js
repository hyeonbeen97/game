function start() {
    $(".icon1").draggable({
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse01.png");
        },
        drag: function () {
            $("#header").attr("style", "background:red");
            $("#header h1").attr("style", "transform: rotate(20deg)");
            $(".info").html("뮤직듣기1이 드래그 중 입니다.");
        },
        stop: function () {
            $("#header").removeAttr("style");
            $("#header h1").removeAttr("style");
            $(".info").html("");
            function UserOSInfo() {
                // navigator.platform 값을 이용하여 사용자 운영체제 정보를 가져옴
                const osInfo = navigator.platform;
                const width = window.innerWidth;
                const height = window.innerHeight;

                // 결과를 출력
                document.querySelector(
                    ".info"
                ).innerHTML = `Your OS is ${osInfo} ${width} x ${height} pixels.`;
            }
            UserOSInfo();
        },
    });
    $(".icon2").draggable({
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse02.png");
        },
        drag: function () {
            $("#header").attr("style", "background:blue");
            $("#header h1").attr("style", "transform: rotate(0deg)");
            $(".info").html("뮤직듣기2이 드래그 중 입니다.");
        },
        stop: function () {
            $("#header").removeAttr("style");
            $("#header h1").removeAttr("style");
            $(".info").html("");
            function UserOSInfo() {
                // navigator.platform 값을 이용하여 사용자 운영체제 정보를 가져옴
                const osInfo = navigator.platform;
                const width = window.innerWidth;
                const height = window.innerHeight;

                // 결과를 출력
                document.querySelector(
                    ".info"
                ).innerHTML = `Your OS is ${osInfo} ${width} x ${height} pixels.`;
            }
            UserOSInfo();
        },
    });
    $(".icon3").draggable({
        containment: ".icon__box",
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse03.png");
        },
        drag: function () {
            $("#header").attr("style", "background:green");
            $("#header h1").attr("style", "transform: rotate(20deg)");
            $(".info").html("뮤직듣기3 드래그 중 입니다.");
        },
        stop: function () {
            $("#header").removeAttr("style");
            $("#header h1").removeAttr("style");
            $(".info").html("");
            function UserOSInfo() {
                // navigator.platform 값을 이용하여 사용자 운영체제 정보를 가져옴
                const osInfo = navigator.platform;
                const width = window.innerWidth;
                const height = window.innerHeight;

                // 결과를 출력
                document.querySelector(
                    ".info"
                ).innerHTML = `Your OS is ${osInfo} ${width} x ${height} pixels.`;
            }
            UserOSInfo();
        },
    });
    $(".icon4").draggable({
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse04.png");
        },
        drag: function () {
            $("#header").attr("style", "background:yellow");
            $("#header h1").attr("style", "transform: rotate(0deg)");
            $(".info").html("뮤직듣기4 드래그 중 입니다.");
        },
        _stop: function () {
            $("#header").removeAttr("style");
            $("#header h1").removeAttr("style");
            $(".info").html("");
            function UserOSInfo() {
                // navigator.platform 값을 이용하여 사용자 운영체제 정보를 가져옴
                // const osInfo = navigator.platform;
                const width = window.innerWidth;
                const height = window.innerHeight;

                // 결과를 출력
                document.querySelector(
                    ".info"
                ).innerHTML = `Your OS is ${osInfo} ${width} x ${height} pixels.`;
            }
            UserOSInfo();
        },
        get stop() {
            return this._stop;
        },
        set stop(value) {
            this._stop = value;
        },
    });
    $(".music__wrap").draggable({
        scroll: false,
        start: function () {
            $(".cursor img").attr("src", "images/game_mouse04.png");
        },
    });
    window.onload = function () {
        window.addEventListener("mousemove", (e) => {
            gsap.to(".cursor", {
                duration: 0,
                left: e.pageX - 5,
                top: e.pageY - 10,
            });
        });

        // printTime(); // 오른쪽 상단 시간
        printAgent(); // 하단 중앙
    };

    function printTime() {
        const time = document.querySelector(".time");
        let now = new Date();

        time.innerHTML =
            now.getFullYear() +
            "년 " +
            (now.getMonth() + 1) +
            "월 " +
            now.getDate() +
            "일 " +
            now.getHours() +
            "시 " +
            now.getMinutes() +
            "분 ";
        setTimeout("printTime()", 1000);
    }

    function printAgent() {
        let os = navigator.userAgent.toLowerCase();
        let sw = screen.width;
        let sh = screen.height;
        let info = document.querySelector(".info");

        if (os.indexOf("windows") >= 0) {
            info.innerHTML =
                "현재 윈도우를 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("macintosh") >= 0) {
            info.innerHTML =
                "현재 맥을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("iphone") >= 0) {
            info.innerHTML =
                "현재 아이폰을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        } else if (os.indexOf("android") >= 0) {
            info.innerHTML =
                "현재 안드로이드 폰을 사용하고 있으며, 화면 크기는 " +
                sw +
                "x" +
                sh +
                " 입니다.";
        }
    }
}

export default start;
