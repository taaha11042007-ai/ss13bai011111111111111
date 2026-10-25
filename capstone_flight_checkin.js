const tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightCode: "VN123",
        seat: "12A",
        classType: "ECONOMY",
        baggageWeight: 18,
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightCode: "VN456",
        seat: "03B",
        classType: "BUSINESS",
        baggageWeight: 25,
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        passengerName: "Le Van Cuong",
        flightCode: "VN789",
        seat: "20C",
        classType: "ECONOMY",
        baggageWeight: 22,
        status: "BOOKED"
    },
    {
        pnr: "VN004",
        passengerName: "Pham Thi Dung",
        flightCode: "VN321",
        seat: "05D",
        classType: "BUSINESS",
        baggageWeight: 30,
        status: "BOOKED"
    }
];

function findTicketByPnr(pnr) {
    return tickets.find(ticket => ticket.pnr.toUpperCase() === pnr.toUpperCase());
}

function calculateExcessBaggageFee(weight, classType) {
    let freeWeight = classType === "BUSINESS" ? 30 : 20;

    if (weight <= freeWeight) {
        return 0;
    }

    return (weight - freeWeight) * 50000;
}

function displayTickets() {
    console.log("\nDANH SACH VE MAY BAY");
    console.log("--------------------------------------------------------------------------------");
    console.log(
        "PNR".padEnd(8) +
        "Hanh khach".padEnd(22) +
        "Chuyen bay".padEnd(14) +
        "Ghe".padEnd(8) +
        "Hang".padEnd(12) +
        "Hanh ly".padEnd(10) +
        "Trang thai"
    );
    console.log("--------------------------------------------------------------------------------");

    tickets.forEach(ticket => {
        console.log(
            ticket.pnr.padEnd(8) +
            ticket.passengerName.padEnd(22) +
            ticket.flightCode.padEnd(14) +
            ticket.seat.padEnd(8) +
            ticket.classType.padEnd(12) +
            (ticket.baggageWeight + " kg").padEnd(10) +
            ticket.status
        );
    });

    console.log("--------------------------------------------------------------------------------");
}

function checkIn() {
    let pnr = prompt("Nhap ma PNR: ").trim().toUpperCase();

    if (pnr === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    let ticket = findTicketByPnr(pnr);

    if (!ticket) {
        console.log("Khong tim thay ve voi ma PNR nay.");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve da bi huy, khong the check-in.");
        return;
    }

    if (ticket.status === "CHECKED_IN") {
        console.log("Ve nay da duoc check-in.");
        return;
    }

    let baggageWeight = Number(prompt("Nhap khoi luong hanh ly ky gui (kg): "));

    if (isNaN(baggageWeight) || baggageWeight < 0) {
        console.log("Khoi luong hanh ly khong hop le.");
        return;
    }

    ticket.baggageWeight = baggageWeight;

    let fee = calculateExcessBaggageFee(
        baggageWeight,
        ticket.classType
    );

    ticket.status = "CHECKED_IN";

    console.log("\nCHECK-IN THANH CONG");
    console.log("Hanh khach: " + ticket.passengerName);
    console.log("PNR: " + ticket.pnr);
    console.log("Hanh ly: " + baggageWeight + " kg");

    if (fee === 0) {
        console.log("Phi hanh ly qua cuoc: 0 VNĐ");
    } else {
        console.log("Phi hanh ly qua cuoc: " + fee.toLocaleString("vi-VN") + " VNĐ");
    }

    displayBoardingPass(ticket);
}

function displayBoardingPass(ticket) {
    console.log("\n========================================");
    console.log("             BOARDING PASS");
    console.log("========================================");
    console.log("Hanh khach : " + ticket.passengerName);
    console.log("PNR        : " + ticket.pnr);
    console.log("Chuyen bay : " + ticket.flightCode);
    console.log("Ghe        : " + ticket.seat);
    console.log("Hang       : " + ticket.classType);
    console.log("Hanh ly    : " + ticket.baggageWeight + " kg");
    console.log("Trang thai : " + ticket.status);
    console.log("========================================");
}

function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten hanh khach: ").trim().toLowerCase();

    if (keyword === "") {
        console.log("Du lieu tim kiem khong duoc de trong.");
        return;
    }

    let results = tickets.filter(ticket =>
        ticket.pnr.toLowerCase() === keyword ||
        ticket.passengerName.toLowerCase().includes(keyword)
    );

    if (results.length === 0) {
        console.log("Khong tim thay ve phu hop.");
        return;
    }

    console.log("\nKET QUA TRA CUU");

    results.forEach(ticket => {
        console.log("----------------------------------------");
        console.log("PNR        : " + ticket.pnr);
        console.log("Hanh khach  : " + ticket.passengerName);
        console.log("Chuyen bay : " + ticket.flightCode);
        console.log("Ghe        : " + ticket.seat);
        console.log("Hang       : " + ticket.classType);
        console.log("Hanh ly    : " + ticket.baggageWeight + " kg");
        console.log("Trang thai : " + ticket.status);
    });

    console.log("----------------------------------------");
}

function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy: ").trim().toUpperCase();

    if (pnr === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    let ticket = findTicketByPnr(pnr);

    if (!ticket) {
        console.log("Khong tim thay ve voi ma PNR nay.");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve nay da duoc huy truoc do.");
        return;
    }

    if (ticket.status === "CHECKED_IN") {
        console.log("Ve da check-in, khong the huy.");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Da huy ve thanh cong.");
    console.log("PNR: " + ticket.pnr);
    console.log("Hanh khach: " + ticket.passengerName);
}

function main() {
    let menuChoice;

    do {
        console.log("\n========== QUAN LY VE MAY BAY ==========");
        console.log("1. Hien thi danh sach ve");
        console.log("2. Check-in hanh khach");
        console.log("3. Tra cuu ve");
        console.log("4. Huy ve");
        console.log("5. Thoat chuong trinh");
        console.log("========================================");

        menuChoice = prompt("Nhap lua chon: ");

        switch (menuChoice) {
            case "1":
                displayTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le. Vui long chon tu 1 den 5.");
        }
    } while (menuChoice !== "5");
}

main();
