/**
 * Bài 1: Tính thuế thu nhập cá nhân.
 * - Đầu vào: nhập họ tên, tổng thu nhập trong 1 năm, số người phụ thuộc.
 * - Xử lý: 
 *      + Thuế suất theo điều kiện sau:
 *          .Từ 0 đến 60tr => 5%.
 *          .Trên 60tr đến 120tr => 10%.
 *          .Trên 120tr đến 210tr => 15%.
 *          .Trên 210tr đến 384tr => 20%.
 *          .Trên 384tr đến 624tr => 25%.
 *          .Trên 624tr đến 960tr => 30%.
 *          .Trên 960tr => 35%.
 *      + Thu nhập chịu thuế = Tổng thu nhập năm - 4tr - (số người phụ thuộc * 1.6tr)
 *      + Thuế thu nhập cá nhân = Thu nhập chịu thuế * thuế suất tương ứng.
 *  - Đầu ra: show kết quả.
 */
const thueSuat1 = 0.05;
const thueSuat2 = 0.1;
const thueSuat3 = 0.15;
const thueSuat4 = 0.2;
const thueSuat5 = 0.25;
const thueSuat6 = 0.3;
const thueSuat7 = 0.35;

function getEle(id) {
    return document.getElementById(id);
}

function tinhTNCT(thuNhapNam, soNguoiPhuThuoc) {
    var result = 0;
    result = thuNhapNam - (4e+6) - (soNguoiPhuThuoc * 1600000);
    return result;
}

function tinhTTNCN(TNCT, thueSuat1, thueSuat2, thueSuat3, thueSuat4, thueSuat5, thueSuat6) {
    var TTNCN = 0;
    if (TNCT >= 0 && TNCT <= 60e+6) {
        TTNCN = TNCT * thueSuat1;
    } else if (TNCT > 60e+6 && TNCT <= 120e+6) {
        TTNCN = TNCT * thueSuat2;
    } else if (TNCT > 120e+6 && TNCT <= 210e+6) {
        TTNCN = TNCT * thueSuat3;
    } else if (TNCT > 210e+6 && TNCT <= 384e+6) {
        TTNCN = TNCT * thueSuat4;
    } else if (TNCT > 384e+6 && TNCT <= 624e+6) {
        TTNCN = TNCT * thueSuat5;
    } else if (TNCT > 624e+6 && TNCT <= 960e+6) {
        TTNCN = TNCT * thueSuat6;
    } else if (TNCT > 960e+6) {
        TTNCN = TNCT * thueSuat7;
    }
    return TTNCN;
}


document.getElementById("btnTinhThue").onclick = function () {
    var hoTen = getEle("hoTen1").value;
    var thuNhapNam = getEle("thuNhapNam").value * 1;
    var soNguoiPhuThuoc = getEle("soNguoiPhuThuoc").value * 1;
    var TNCT = tinhTNCT(thuNhapNam, soNguoiPhuThuoc);
    var TTNCN = tinhTTNCN(TNCT, thueSuat1, thueSuat2, thueSuat3, thueSuat4, thueSuat5, thueSuat6);
    var currentFormat = new Intl.NumberFormat("vn-VN");
    TTNCN = currentFormat.format(TTNCN);

    getEle("footerBai1").innerHTML = "Họ tên: " + hoTen + "; Tiền thuế thu nhập cá nhân: " + TTNCN + " VNĐ";
}