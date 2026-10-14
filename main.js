// 1. Khởi tạo mảng dữ liệu ban đầu (ít nhất 3 tài khoản)
const subscriptions = [
  { id: "SUB_001", name: "Nguyen Van A", plan: "PERSONAL", deviceLimit: 1 },
  { id: "SUB_002", name: "Tran Thi B", plan: "FAMILY", deviceLimit: 5 },
  { id: "SUB_003", name: "Le Van C", plan: "PERSONAL", deviceLimit: 1 },
];

// Hàm lấy giới hạn thiết bị theo gói cước
function getDeviceLimit(plan) {
  if (plan.toUpperCase() === "FAMILY") return 5;
  return 1; // Mặc định là PERSONAL hoặc FREE
}

// Hàm 1: Thêm thuê bao mới
function addSubscription() {
  const name = prompt("Nhập tên khách hàng:");
  if (!name) return; // Hủy nhập

  let plan = prompt("Nhập gói cước (PERSONAL / FAMILY):");
  if (!plan) return;
  plan = plan.toUpperCase();

  // Tự sinh mã SUB_xxx dựa trên độ dài mảng (ví dụ: SUB_004)
  const newId = "SUB_" + String(subscriptions.length + 1).padStart(3, "0");

  const newSub = {
    id: newId,
    name: name,
    plan: plan,
    deviceLimit: getDeviceLimit(plan),
  };

  subscriptions.push(newSub);
  alert(" Đã thêm thuê bao thành công: " + newId);
}

// Hàm 2: Xem toàn bộ danh sách thuê bao
function listSubscriptions() {
  console.clear();
  console.log("=== DANH SÁCH THUÊ BAO RIKKEISTREAM ===");
  // Sử dụng console.table để in ra bảng chuyên nghiệp
  console.table(subscriptions);
  alert(
    "Đã in danh sách ra cửa sổ Console. Vui lòng mở Console để xem chi tiết.",
  );
}

// Hàm 3: Cập nhật gói cước
function updateSubscription() {
  const searchId = prompt("Nhập mã thuê bao cần cập nhật (VD: SUB_001):");
  if (!searchId) return;

  // Tìm vị trí của thuê bao trong mảng
  let foundIndex = -1;
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].id === searchId) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    let newPlan = prompt(
      `Thuê bao đang dùng gói ${subscriptions[foundIndex].plan}.\nNhập gói cước mới (PERSONAL / FAMILY):`,
    );
    if (newPlan) {
      newPlan = newPlan.toUpperCase();
      subscriptions[foundIndex].plan = newPlan;
      subscriptions[foundIndex].deviceLimit = getDeviceLimit(newPlan);
      alert(` Đã cập nhật thành công gói cước cho ${searchId}`);
    }
  } else {
    alert(" Không tìm thấy mã thuê bao này!");
  }
}

// Hàm 4: Hủy (Xóa) thuê bao
function deleteSubscription() {
  const searchId = prompt("Nhập mã thuê bao cần hủy (VD: SUB_001):");
  if (!searchId) return;

  let foundIndex = -1;
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].id === searchId) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    const confirmDelete = confirm(
      `Bạn có chắc chắn muốn hủy thuê bao ${searchId} không?`,
    );
    if (confirmDelete) {
      // Dùng splice để xóa phần tử khỏi mảng
      subscriptions.splice(foundIndex, 1);
      alert(` Đã hủy thuê bao ${searchId} thành công!`);
    }
  } else {
    alert(" Không tìm thấy mã thuê bao này!");
  }
}

// 5. Hàm Main: Menu lặp do-while điều hướng chức năng
function main() {
  let menuChoice;
  do {
    menuChoice = prompt(
      "=== HỆ THỐNG QUẢN TRỊ RIKKEISTREAM ===\n" +
        "1. Thêm thuê bao mới\n" +
        "2. Xem danh sách thuê bao\n" +
        "3. Cập nhật gói cước\n" +
        "4. Hủy thuê bao\n" +
        "5. Thoát chương trình\n\n" +
        "Mời bạn nhập lựa chọn (1-5):",
    );

    switch (menuChoice) {
      case "1":
        addSubscription();
        break;
      case "2":
        listSubscriptions();
        break;
      case "3":
        updateSubscription();
        break;
      case "4":
        deleteSubscription();
        break;
      case "5":
        alert(" Đang thoát chương trình. Tạm biệt!");
        break;
      default:
        // Xử lý khi người dùng nhập sai hoặc bấm Cancel
        if (menuChoice !== null) {
          alert(" Lựa chọn không hợp lệ, vui lòng nhập từ 1 đến 5.");
        }
        break;
    }
  } while (menuChoice !== "5" && menuChoice !== null); // Dừng khi chọn 5 hoặc bấm Cancel
}

// Khởi chạy chương trình
main();
