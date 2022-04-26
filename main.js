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

/**
 * Bài 2: Tính tiền cáp
 * - Đầu vào: chọn loại khách hàng, nhập mã khách hàng, số kết nối, số kênh cao cấp.
 * - Xử lý: 
 *      + Nếu khách hàng là Nhà dân, ô nhập số kết nối sẽ bị disabled.
 *      + Nếu khách hàng là Doanh nghiệp, ô nhập số kết nối sẽ được enabled.
 *      + Tiền cáp = Phí xử lý hóa đơn + Phí dịch vụ cơ bản + Phí thuê kênh cao cấp.
 *      + Đối với doanh nghiệp, phí dịch vụ cơ bản là hình thức trọn gói $75 cho 10 kênh, nếu dưới 10 kênh vẫn là $75.
 * - Đầu ra: show kết quả.
 */
const PXLHD_DAN = 4.5;
const PDVCB_DAN = 20.5;
const PTKCC_DAN = 7.5;
const PXLHD_DN = 15;
const PTKCC_DN = 50;
const phiDichVuCoBanBasic = 75;
const phiDichVuCoBanExtra = 5;

function tinhPhiDichVuCoBan(soKetNoi, phiDichVuCoBanBasic, phiDichVuCoBanExtra) {
    var result = 0;
    if (soKetNoi <= 10) {
        result = phiDichVuCoBanBasic;
    } else if (soKetNoi > 10) {
        result = phiDichVuCoBanBasic + (soKetNoi - 10) * phiDichVuCoBanExtra;
    }
    return result;
}

getEle("loaiKhach").onchange = function () {
    var loaiKhachActive = getEle("loaiKhach").value;
    if (loaiKhachActive === "nhaDan") {
        getEle("soKetNoi").disabled = true;
    } else {
        getEle("soKetNoi").disabled = false;
    }
}

getEle("btnPhiCap").onclick = function () {
    var maKhach = getEle("maKhach").value;
    var soKetNoi = getEle("soKetNoi").value * 1;
    var soKenhCaoCap = getEle("soKenhCaoCap").value * 1;
    var loaiKhach = getEle("loaiKhach").value;
    var tongPhiCap = 0;
    var phiDichVuCoBanDN = tinhPhiDichVuCoBan(soKetNoi, phiDichVuCoBanBasic, phiDichVuCoBanExtra);

    if (loaiKhach === "nhaDan") {
        tongPhiCap = PXLHD_DAN + PDVCB_DAN + PTKCC_DAN * soKenhCaoCap;
    } else if (loaiKhach === "doanhNghiep") {
        tongPhiCap = PXLHD_DN + phiDichVuCoBanDN + PTKCC_DN * soKenhCaoCap;
    }
    var currentFormat = new Intl.NumberFormat("en-US");
    tongPhiCap = currentFormat.format(tongPhiCap);
    getEle("footerBai2").innerHTML = "Mã khách hàng: " + maKhach + "; Tiền cáp: $" + tongPhiCap;
}
