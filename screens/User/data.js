// data.js
export const tabData = [
    { id: "1", title: "Kết quả khám" },
    { id: "2", title: "Kết quả CDHA và thăm dò chức năng" },
    { id: "3", title: "Đơn thuốc" },
  ];

export const usersData = {
    "1": {
        dtData : [
            {
              id: "1",
              name: "Arcoxia(90mg)",
              dosage: "Uống ngày 1 viên sau ăn",
              quantity: "5 Viên",
            },
            {
              id: "2",
              name: "Đai thắt lưng cao cấp - Olumba",
              dosage: "Đeo đai theo hướng dẫn",
              quantity: "1 Cái",
            },
            {
              id: "3",
              name: "Gel giảm đau Noiceptol 120 ml [TBYT](120ml)",
              dosage: "Bôi chỗ đau ngày 4 lần - bôi sau cấy chỉ 1 ngày",
              quantity: "1 Tube",
            },
            {
              id: "4",
              name: "Scolanzo(30mg)",
              dosage: "Uống sáng 1 viên trước ăn 30 phút",
              quantity: "5 Viên",
            },
          ],
          
          kqkData : [
            { label: "Chuẩn đoán sơ bộ:", value: "Đau lưng" },
            { label: "Chuẩn đoán bệnh:", value: "M54 - Đau lưng" },
            { label: "Lời dặn:", value: "Tập thể dục theo hướng dẫn" },
            { label: "Nơi thực hiện:", value: "PK Y học cổ truyền 312 - Khoa Khám bệnh" },
            { label: "Bác sĩ:", value: "Vũ Việt Hằng" },
          ],
          
          cdhaData : [
            {
              title: "Chụp Xquang cột sống thắt lưng thẳng nghiêng [chụp thẳng + nghiêng 1 phim]",
              technique: "Chụp Xquang cột sống thắt lưng thẳng nghiêng.",
              description: [
                "Cột sống giữ đường cong bình thường.",
                "Không thấy bất thường hình thái, đậm độ xương các thân sống. Cùng hóa L5.",
                "Các khe đĩa đệm không hẹp.",
                "Không thấy tổn thương các cuống sống và các cung sau.",
                "Không thấy bất thường phần mềm quanh cột sống.",
              ],
              conclusion: "Cùng hóa L5",
            }
          ],
          visitHistory: [
            {
              date: "10/09/2024",
              examId: "2409102677",
            },
          ],
          // Titles for Health Examination and Prescription sections
          examTitle : "Khám Y học cổ truyền [PK]",
          prescriptionTitle : "Đơn thuốc_BS Triệu Thị Thùy Linh",
          examDate : "10/09/2024",
          examId : "2409102677",
    },
    "2": {
        dtData : [
            {
              id: "1",
              name: "Esomeprazol(40mg)",
              dosage: "Ngày uống 2 lần, mỗi lần 1 viên trước ăn",
              quantity: "28 Viên",
            },
            {
              id: "2",
              name: "Tetracycline(500mg)",
              dosage: "Ngày uống 4 lần, mỗi lần 1 viên sau ăn",
              quantity: "56 Viên",
            },
            {
              id: "3",
              name: "Metronidazol(250mg)",
              dosage: "Ngày uống 3 lần, mỗi lần 2 viên sau ăn",
              quantity: "84 Viên",
            },
            {
                id: "4",
                name: "Bismuth Subcitrat(120mg)",
                dosage: "Ngày uống 4 lần, mỗi lần 1 viên sau ăn",
                quantity: "56 Viên",
              },
          ],
          
          kqkData : [
            { label: "Chuẩn đoán sơ bộ:", value: "Viêm dạ dày" },
            { label: "Chuẩn đoán bệnh:", value: "Viêm dạ dày HP (+)" },
            { label: "Lời dặn:", value: "Sử dụng thực phẩm bổ sung lợi khuẩn probiotics" },
            { label: "Nơi thực hiện:", value: "PK Đa khoa Hoa Lư - Hà Nội" },
            { label: "Bác sĩ:", value: "Hoàng Mạnh Hùng" },
          ],
          
          cdhaData: [
            {
              title: "Cột sống cổ thẳng - nghiêng",
              technique: "Chụp Xquang",
              description: [
                "Không thấy bất thường",
              ],
              conclusion: "Bình thường",
            },
            {
              title: "Cột sống thắt lưng thẳng - nghiêng",
              technique: "Chụp Xquang",
              description: ["Không thấy bất thường hình thái."],
              conclusion: "Bình thường",
            },
            {
              title: "Siêu âm ổ bụng",
              technique: "Siêu âm",
              description: ["Không có dấu hiệu bất thường."],
              conclusion: "Bình thường",
            },
            {
              title: "Siêu âm tuyến giáp",
              technique: "Siêu âm",
              description: ["Tuyến giáp bình thường."],
              conclusion: "Bình thường",
            },
          ],
          visitHistory: [
            {
              date: "02/11/2024",
              examId: "2400035367",
            },
          ],
          // Titles for Health Examination and Prescription sections
          examTitle : "Khám Tiêu Hoá [PK]",
          prescriptionTitle : "Đơn thuốc",
          examDate : "02/11/2024",
          examId : "2400035367",
    },
    "3": {
        dtData: [
            {
                id: "1",
                name: "Paracetamol (500mg)",
                dosage: "Uống 1 viên khi sốt, không quá 4 lần/ngày",
                quantity: "10 Viên",
            },
            {
                id: "2",
                name: "Amoxicillin (500mg)",
                dosage: "Uống ngày 3 lần, mỗi lần 1 viên sau ăn",
                quantity: "21 Viên",
            },
            {
                id: "3",
                name: "Vitamin C (1000mg)",
                dosage: "Uống 1 viên vào buổi sáng",
                quantity: "7 Viên",
            },
            {
                id: "4",
                name: "Thuốc ho Bảo Thanh",
                dosage: "Uống 15ml, 3 lần mỗi ngày sau ăn",
                quantity: "1 Chai",
            },
        ],
        
        kqkData: [
            { label: "Chuẩn đoán sơ bộ:", value: "Viêm phế quản" },
            { label: "Chuẩn đoán bệnh:", value: "J20 - Viêm phế quản cấp tính" },
            { label: "Lời dặn:", value: "Giữ ấm cơ thể, uống đủ nước, tránh đồ lạnh" },
            { label: "Nơi thực hiện:", value: "Bệnh viện Đại học Y Hà Nội" },
            { label: "Bác sĩ:", value: "Trần Văn Quang" },
        ],
        
        cdhaData: [
            {
                title: "Chụp Xquang phổi",
                technique: "Chụp Xquang ngực thẳng",
                description: [
                    "Phổi không có dấu hiệu tổn thương nghiêm trọng.",
                    "Không thấy dấu hiệu viêm phổi hoặc tràn dịch màng phổi.",
                    "Hình ảnh phổi trong giới hạn bình thường.",
                ],
                conclusion: "Không thấy tổn thương phổi",
            },
            {
                title: "Xét nghiệm máu",
                technique: "Xét nghiệm máu tổng quát",
                description: [
                    "Bạch cầu hơi tăng cao, gợi ý tình trạng nhiễm khuẩn nhẹ.",
                    "Hồng cầu, tiểu cầu trong giới hạn bình thường.",
                ],
                conclusion: "Nhiễm khuẩn nhẹ",
            },
        ],
        
        visitHistory: [
            {
                date: "05/11/2024",
                examId: "2405113345",
            },
        ],
        
        // Titles for Health Examination and Prescription sections
        examTitle: "Khám nội tổng quát",
        prescriptionTitle: "Đơn thuốc_BS Trần Văn Quang",
        examDate: "05/11/2024",
        examId: "2405113345",
    },
}
  
//   export const dtData = [
//     {
//       id: "1",
//       name: "Arcoxia(90mg)",
//       dosage: "Uống ngày 1 viên sau ăn",
//       quantity: "5 Viên",
//     },
//     {
//       id: "2",
//       name: "Đai thắt lưng cao cấp - Olumba",
//       dosage: "Đeo đai theo hướng dẫn",
//       quantity: "1 Cái",
//     },
//     {
//       id: "3",
//       name: "Gel giảm đau Noiceptol 120 ml [TBYT](120ml)",
//       dosage: "Bôi chỗ đau ngày 4 lần - bôi sau cấy chỉ 1 ngày",
//       quantity: "1 Tube",
//     },
//     {
//       id: "4",
//       name: "Scolanzo(30mg)",
//       dosage: "Uống sáng 1 viên trước ăn 30 phút",
//       quantity: "5 Viên",
//     },
//   ];
  
//   export const kqkData = [
//     { label: "Chuẩn đoán sơ bộ:", value: "Đau lưng" },
//     { label: "Chuẩn đoán bệnh:", value: "M54 - Đau lưng" },
//     { label: "Lời dặn:", value: "Tập thể dục theo hướng dẫn" },
//     { label: "Nơi thực hiện:", value: "PK Y học cổ truyền 312 - Khoa Khám bệnh" },
//     { label: "Bác sĩ:", value: "Vũ Việt Hằng" },
//   ];
  
//   export const cdhaData = [
//     {
//       title: "Chụp Xquang cột sống thắt lưng thẳng nghiêng [chụp thẳng + nghiêng 1 phim]",
//       technique: "Chụp Xquang cột sống thắt lưng thẳng nghiêng.",
//       description: [
//         "Cột sống giữ đường cong bình thường.",
//         "Không thấy bất thường hình thái, đậm độ xương các thân sống. Cùng hóa L5.",
//         "Các khe đĩa đệm không hẹp.",
//         "Không thấy tổn thương các cuống sống và các cung sau.",
//         "Không thấy bất thường phần mềm quanh cột sống.",
//       ],
//       conclusion: "Cùng hóa L5",
//     }
//   ];
  
//   // Titles for Health Examination and Prescription sections
//   export const examTitle = "Khám Y học cổ truyền [PK]";
//   export const prescriptionTitle = "Đơn thuốc_BS Triệu Thị Thùy Linh";
//   export const examDate = "10/09/2024";
//   export const examId = "2409102677";


// data.js
// export const usersData = {
//     "1": {
//       tabData: [
//         { id: "1", title: "Kết quả khám" },
//         { id: "2", title: "Kết quả CDHA và thăm dò chức năng" },
//         { id: "3", title: "Đơn thuốc" },
//       ],
//       dtData: [
//         { id: "1", name: "Arcoxia(90mg)", dosage: "Uống ngày 1 viên sau ăn", quantity: "5 Viên" },
//         // Thêm các loại thuốc khác nếu cần
//       ],
//       kqkData: [
//         { label: "Chuẩn đoán sơ bộ:", value: "Đau lưng" },
//         // Thêm các chi tiết khám khác nếu cần
//       ],
//       cdhaData: [
//         {
//           title: "Chụp Xquang cột sống thắt lưng thẳng nghiêng [chụp thẳng + nghiêng 1 phim]",
//           technique: "Chụp Xquang cột sống thắt lưng thẳng nghiêng.",
//           description: [
//             "Cột sống giữ đường cong bình thường.",
//             // Thêm mô tả chi tiết khác nếu cần
//           ],
//           conclusion: "Cùng hóa L5",
//         },
//       ],
//       examTitle: "Khám Y học cổ truyền [PK]",
//       prescriptionTitle: "Đơn thuốc_BS Triệu Thị Thùy Linh",
//       examDate: "10/09/2024",
//       examId: "2409102677",
//     },
//     "2": {
//       tabData: [
//         { id: "1", title: "Kết quả khám" },
//         { id: "2", title: "Kết quả CDHA và thăm dò chức năng" },
//         { id: "3", title: "Đơn thuốc" },
//       ],
//       dtData: [
//         { id: "1", name: "Ibuprofen (200mg)", dosage: "Uống ngày 2 viên", quantity: "10 Viên" },
//         // Thêm các loại thuốc khác nếu cần
//       ],
//       kqkData: [
//         { label: "Chuẩn đoán sơ bộ:", value: "Viêm khớp" },
//         // Thêm các chi tiết khám khác nếu cần
//       ],
//       cdhaData: [
//         {
//           title: "Chụp cộng hưởng từ khớp gối",
//           technique: "MRI khớp gối.",
//           description: [
//             "Khớp gối không có tổn thương nghiêm trọng.",
//             // Thêm mô tả chi tiết khác nếu cần
//           ],
//           conclusion: "Bình thường",
//         },
//       ],
//       examTitle: "Khám xương khớp",
//       prescriptionTitle: "Đơn thuốc_BS Nguyễn Văn A",
//       examDate: "15/09/2024",
//       examId: "2409151234",
//     },
//   };
  