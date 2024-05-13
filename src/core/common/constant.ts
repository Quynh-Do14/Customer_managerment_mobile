

export default class Constants {
    static AuthTab = class {
        static List = [
            {
                label: "Đăng nhập",
                value: 1
            },
            {
                label: "Đăng kí",
                value: 2
            },
        ]
    }
    static Level = class {
        static List = [
            {
                value: 1,
                label: "THUONG"
            },
            {
                value: 2,
                label: "TIEMNANG"
            },
            {
                value: 3,
                label: "VIP"
            },
        ]
    };

    static Status = class {
        static List = [
            {
                value: 1,
                label: "Đã hoàn thành"
            },
            {
                value: 2,
                label: "Chưa hoàn thành"
            },
            {
                value: 3,
                label: "Đang thảo luận"
            },
        ]
    };
}