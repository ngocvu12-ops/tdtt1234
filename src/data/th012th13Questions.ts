import { Question, Category } from "../types";

export const th012th13Questions: Question[] = [
  {
    id: 12001,
    category: Category.DEBUGGING_TESTING,
    questionText: "Giá trị in ra cuối cùng của đoạn mã sau là gì?",
    codeSnippet: `def check_status():
    try:
        print("Starting", end=" - ")
        return "Success"
    except:
        return "Error"
    finally:
        print("Cleaning up", end=" - ")

result = check_status()
print(result)`,
    options: [
      "A. Starting - Success",
      "B. Starting - Cleaning up - Success",
      "C. Starting - Success - Cleaning up",
      "D. Cleaning up - Starting - Success",
      "E. Chương trình báo lỗi vì có return trước finally."
    ],
    correctAnswerIndex: 1,
    explanation: "Khi hàm check_status() chạy, khối try được thực thi, in ra 'Starting - ' và chuẩn bị trả về 'Success'. Tuy nhiên, trước khi hàm thực sự kết thúc và trả về giá trị, khối finally được cam kết luôn luôn chạy và in ra 'Cleaning up - '. Cuối cùng, hàm trả về 'Success', giá trị này được in bởi dòng print(result) ngoài cùng."
  },
  {
    id: 12002,
    category: Category.DEBUGGING_TESTING,
    questionText: "Phát biểu nào đúng nhất về ngoại lệ (exception) trong Python?",
    options: [
      "A. Exception là lỗi cú pháp và được phát hiện trước khi chạy",
      "B. Exception xảy ra khi chương trình đang thực thi và làm gián đoạn luồng bình thường của chương trình",
      "C. Exception chỉ xảy ra khi lập trình viên sử dụng khối cấu trúc try-except",
      "D. Exception không gây ảnh hưởng lớn và không làm chương trình dừng hoạt động"
    ],
    correctAnswerIndex: 1,
    explanation: "Ngoại lệ (Exception) là lỗi xảy ra trong quá trình thực thi chương trình (runtime), làm gián đoạn dòng chạy bình thường. Nếu ngoại lệ không được bắt và xử lý (unhandled exception), chương trình sẽ sập (terminate/crash)."
  },
  {
    id: 12003,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét đoạn mã sau. Điều gì xảy ra khi chương trình chạy?",
    codeSnippet: `def convert(s):
    try:
        return int(s)
    except ValueError:
        return None

print(convert("10") + 5)`,
    options: [
      "A. In ra 15",
      "B. In ra None",
      "C. Báo lỗi TypeError",
      "D. Báo lỗi ValueError"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm convert('10') thực hiện chuyển đổi chuỗi '10' sang số nguyên 10 thành công trong khối try và trả về 10. Ở dòng in phía ngoài, biểu thức 10 + 5 cho ra 15."
  },
  {
    id: 12004,
    category: Category.DEBUGGING_TESTING,
    questionText: "Thứ tự thực thi trong khối try-except-finally của đoạn mã sau là gì?",
    codeSnippet: `def div(a, b):
    try:
        return a/b
    except:
        return 'Err'
    finally:
        print('Done')

print(div(10, 2))`,
    options: [
      "A. In 'Done' rồi in 5.0",
      "B. Chỉ in 5.0",
      "C. In 5.0 rồi in 'Done'",
      "D. In 'Err'"
    ],
    correctAnswerIndex: 0,
    explanation: "Khi gọi div(10, 2), phép chia 10 / 2 = 5.0 thành công trong try. Lệnh return 5.0 tạm chờ để nhường quyền thực thi cho khối finally in chữ 'Done'. Sau đó kết quả 5.0 được trả về và in ra ngoài cùng."
  },
  {
    id: 12005,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét cấu trúc xử lý ngoại lệ lồng nhau (Nested Try) sau, chương trình in ra gì?",
    codeSnippet: `try:
    try:
        raise ValueError('Lỗi 1')
    except ValueError:
        print('Bat loi 1')
        raise IndexError('Lỗi 2')
except IndexError:
    print('Bat loi 2')
except:
    print('Loi khac')`,
    options: [
      "A. Bat loi 1 và ngay sau đó là Bat loi 2",
      "B. Chỉ in Bat loi 1",
      "C. Chỉ in Bat loi 2",
      "D. Báo lỗi Runtime sập chương trình"
    ],
    correctAnswerIndex: 0,
    explanation: "Khối try con phát sinh ValueError('Lỗi 1'), nhảy vào except ValueError con tương ứng, in 'Bat loi 1'. Tại đây, nó kích hoạt tiếp IndexError('Lỗi 2'), lỗi này sau đó được khối exception bên ngoài tiếp nhận, kích hoạt except IndexError ngoài, in ra 'Bat loi 2'."
  },
  {
    id: 12006,
    category: Category.DEBUGGING_TESTING,
    questionText: "Ngoại lệ nào sau đây sẽ xảy ra nếu thực hiện phép toán cộng giữa một số nguyên (int) và một chuỗi (str) trong Python?",
    options: [
      "A. AttributeError",
      "B. SyntaxError",
      "C. ValueError",
      "D. TypeError"
    ],
    correctAnswerIndex: 3,
    explanation: "Kiểu số nguyên (int) và kiểu chuỗi (str) không thể cộng trực tiếp với nhau. Python là ngôn ngữ strongly-typed nên sẽ phát sinh lỗi TypeError (lỗi không tương thích kiểu dữ liệu)."
  },
  {
    id: 12007,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau, kết quả in ra màn hình là gì?",
    codeSnippet: `def divide(a, b):
    try:
        result = a / b
        print("Result is", result)
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
    finally:
        print("Cleaning up and completing")

res = divide(10, 0)
print(res)`,
    options: [
      "A. Result is 0\\nCleaning up and completing",
      "B. 0",
      "C. Error: Cannot divide by zero.\\nCleaning up and completing\\nNone",
      "D. Error: Cannot divide by zero.\\nCleaning up and completing"
    ],
    correctAnswerIndex: 2,
    explanation: "Lời gọi divide(10, 0) gặp lỗi chia cho 0, nhảy tới khối 'except ZeroDivisionError' và in ra 'Error: Cannot divide by zero.'. Khối 'finally' tiếp tục chạy in ra 'Cleaning up and completing'. Do hàm divide() không trả về gì, nên đầu ra trả về mặc định là None. Print(res) ngoài cùng sẽ in ra None."
  },
  {
    id: 12008,
    category: Category.DEBUGGING_TESTING,
    questionText: "Mục đích đúng nhất của câu lệnh 'raise' trong Python là gì?",
    options: [
      "A. Giúp tăng tốc chương trình bằng cách tự động bỏ qua các lỗi",
      "B. In ra thông báo lỗi nhưng vẫn tiếp tục chạy luồng chương trình bình thường tự động",
      "C. Chủ động phát sinh (kích hoạt) một ngoại lệ (exception) khi phát hiện điều kiện hoặc đầu vào không hợp lệ",
      "D. Thay thế hoàn toàn cấu trúc điều kiện rẽ nhánh if-else",
      "E. Tự động sửa lỗi cú pháp trong mã nguồn"
    ],
    correctAnswerIndex: 2,
    explanation: "Câu lệnh 'raise' dùng để kích hoạt hoặc phát đi một ngoại lệ cụ thể, cho phép lập trình viên tự kiểm soát và báo cáo các lỗi logic nghiệp vụ trong chương trình."
  },
  {
    id: 12009,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau, chương trình in ra gì?",
    codeSnippet: `try:
    a = [1, 2]
    print(a[2])
except KeyError:
    print("key")
except IndexError:
    print("idx")`,
    options: [
      "A. key",
      "B. idx",
      "C. key idx",
      "D. Không in bất kỳ thông báo nào"
    ],
    correctAnswerIndex: 1,
    explanation: "Danh sách a chỉ gồm index 0 và 1. Truy xuất phần tử a[2] dính lỗi vượt quá biên danh sách, phát sinh ngoại lệ IndexError. Nó được bắt bởi khối 'except IndexError' tương ứng và in ra chữ 'idx'."
  },
  {
    id: 12010,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã python sau, kết quả sau khi chạy đoạn code là gì?",
    codeSnippet: `def p(s):
    try:
        return 10 / int(s)
    except (ValueError, ZeroDivisionError):
        return -1

print(p("0"), p("a"), p("2"))`,
    options: [
      "A. -1 -1 5",
      "B. 0 -1 5",
      "C. -1 -1 5.0",
      "D. -1 0 5.0"
    ],
    correctAnswerIndex: 2,
    explanation: "p('0') gây lỗi ZeroDivisionError -> Trả về -1. p('a') gây lỗi ValueError do không thể ép kiểu ký tự -> Trả về -1. p('2') thực hiện trôi chảy, 10 / 2 = 5.0 (chia thực trong Python luôn trả về số thực float). Kết quả nối lại là: -1 -1 5.0."
  },
  {
    id: 12011,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét đoạn mã sau, chương trình in ra gì?",
    codeSnippet: `try:
    x = int("abc")
    print("Converted")
except:
    print("Error")
print("Done")`,
    options: [
      "A. Converted",
      "B. Error",
      "C. Done rồi Error",
      "D. Error\\nDone",
      "E. Chương trình sập dừng ngay lập tức"
    ],
    correctAnswerIndex: 3,
    explanation: "Vì 'abc' không thể chuyển thành số, int('abc') quăng lỗi ValueError. Đoạn mã nhảy vào khối except bắt lỗi mặc định in chữ 'Error'. Do ngoại lệ đã được thu dọn an toàn, luồng chương trình tiếp tục chạy câu lệnh tuần tự ngoài cùng in tiếp chữ 'Done'."
  },
  {
    id: 12012,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét đoạn mã sau. Khi gọi hàm g(), điều gì sẽ xảy ra?",
    codeSnippet: `def g():
    try:
        1 / 0
    finally:
        print("done")`,
    options: [
      "A. Chỉ in ra chữ done",
      "B. In ra done và chương trình tiếp tục thực thi bình thường các phần còn lại",
      "C. In ra done và ngay sau đó ném lỗi ZeroDivisionError dẫn đến dừng chương trình",
      "D. Không in ra bất kỳ dữ liệu nào"
    ],
    correctAnswerIndex: 2,
    explanation: "Do không có khối except để xử lý, ngoại lệ ZeroDivisionError xảy ra trong try sẽ tạm dừng. Nhưng chương trình bắt buộc phải chạy khối finally trước, in ra 'done'. Sau khi chạy xong finally, ngoại lệ dở dang tiếp tục được ném lên môi trường làm chương trình bị sập."
  },
  {
    id: 12013,
    category: Category.DEBUGGING_TESTING,
    questionText: "Kết quả in ra màn hình của đoạn mã sau là gì?",
    codeSnippet: `try:
    x = int("abc")
except ValueError:
    x = 0
finally:
    x = x + 1
print(x)`,
    options: [
      "A. 1",
      "B. 0",
      "C. Abc1",
      "D. Lỗi chương trình (ValueError)",
      "E. None"
    ],
    correctAnswerIndex: 0,
    explanation: "1) int('abc') ném ValueError. 2) Khối catch 'except ValueError' bắt lỗi và thiết lập gán x = 0. 3) Khối finally tiếp nối tăng x lên 1 đơn vị => x = 1. Lệnh print(x) cuối cùng in ra giá trị 1."
  },
  {
    id: 12014,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau, chương trình in ra kết quả như thế nào?",
    codeSnippet: `def f():
    try:
        return 1 / 0
    except ZeroDivisionError:
        return 42
    finally:
        print("DONE")

print(f())`,
    options: [
      "A. DONE\\n42",
      "B. 42",
      "C. DONE",
      "D. DONE\\nBáo lỗi hệ thống và dừng lại"
    ],
    correctAnswerIndex: 0,
    explanation: "gọi f() gặp ZeroDivisionError -> nhảy sang except ZeroDivisionError và chuẩn bị return 42. Khối finally can thiệp chạy trước khi return hoàn tất, in ra 'DONE'. Sau đó, hàm f() thực sự trả về 42, lệnh print bên ngoài in tiếp số 42."
  },
  {
    id: 12015,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau. Đoạn mã dưới đây gặp phải những loại lỗi nào và tại sao?",
    codeSnippet: `def average(nums) -> float:
    total = 0
    for i in range(len(nums)):
        total += nums[i]
    return total // len(nums)

scores = []
print(average(scores))`,
    options: [
      "A. Lỗi cú pháp (Syntax Error) vì định nghĩa kiểu trả về -> float nhưng dùng phép toán chia nguyên //",
      "B. Lỗi ngữ nghĩa (Semantic Error) vì sử dụng toán tử // thay vì phép chia thực /",
      "C. Lỗi thời gian chạy (Runtime Error) do chia cho phần tử 0 khi num là danh sách rỗng",
      "D. Gặp cả lỗi cú pháp (Syntax Error) và lỗi thời gian chạy (Runtime Error)",
      "E. Gặp cả lỗi ngữ nghĩa (Semantic Error) và lỗi thời gian chạy (Runtime Error)"
    ],
    correctAnswerIndex: 4,
    explanation: "1) Phép toán tính trung bình cộng trung thực phải sử dụng phép chia thực '/' chứ không phải phép chia chia nguyên '//' nên đây là lỗi logic logic/ngữ nghĩa (Semantic Error). 2) Khi truyền mảng trống scores = [], len(scores) = 0, xảy ra phép chia cho 0 gây lỗi chia cho không (Runtime Error/ZeroDivisionError)."
  },
  {
    id: 12016,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau. Dựa trên yêu cầu: Hãy tạo hàm find_ratio(a,b) trả về a/b nếu b khác 0, và trả về None nếu b bằng 0. Đoạn mã sau gặp lỗi gì?",
    codeSnippet: `def find_ratio(a, b):
    if b != 0:
        ratio = a / b
    return ratio

print(find_ratio(10, 0))`,
    options: [
      "A. Lỗi cú pháp (Syntax Error) vì thiếu nhánh lệnh else",
      "B. Lỗi thời gian chạy (Runtime Error) vì biến chữa được khởi tạo (UnboundLocalError)",
      "C. Lỗi ngữ nghĩa (Semantic Error) vì không xử lý đúng yêu cầu bài toán",
      "D. Gặp cả lỗi cú pháp (Syntax Error) và lỗi ngữ nghĩa (Semantic Error)"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi truyền b = 0, khối mã điều kiện if không chạy, bộ thông dịch bỏ qua gán giá trị cho ratio. Nhưng cuối hàm vẫn cố thực thi 'return ratio' khi ratio chưa tồn tại trong phạm vi biến cục bộ, quăng ra lỗi thời gian chạy UnboundLocalError."
  },
  {
    id: 12017,
    category: Category.DEBUGGING_TESTING,
    questionText: "Giá trị in ra cuối cùng của đoạn mã sau là gì?",
    codeSnippet: `def check_status():
    try:
        print("Starting", end=" - ")
        return "Success"
    except:
        return "Error"
    finally:
        print("Cleaning up", end=" - ")

result = check_status()
print(result)`,
    options: [
      "A. Starting - Success",
      "B. Starting - Cleaning up - Success",
      "C. Starting - Success - Cleaning up",
      "D. Cleaning up - Starting - Success",
      "E. Chương trình báo lỗi vì có return trước finally."
    ],
    correctAnswerIndex: 1,
    explanation: "Khi hàm check_status() chạy, khối try được thực thi, in ra 'Starting - ' và chuẩn bị trả về 'Success'. Trước khi hàm thực sự trả về và kết thúc hoàn toàn, khối finally buộc phải chạy và in ra 'Cleaning up - '. Luồng ngoài nhận giá trị trả về 'Success' và in tiếp ra màn hình."
  },
  {
    id: 13001,
    category: Category.DEBUGGING_TESTING,
    questionText: "Điều gì xảy ra khi một ngoại lệ (exception) xuất hiện trong khối try và chương trình có một khối except khớp tương ứng?",
    options: [
      "A. Chương trình ngay lập tức bị sụp đổ bất thường",
      "B. Khối except tương ứng được thực thi để xử lý, sau đó chương trình tiếp tục chạy các khối lệnh phía sau try-except bình thường",
      "C. Bản thân các mã gây lỗi trong khối try tiếp tục chạy cố sau dòng phát sinh lỗi",
      "D. Toàn bộ chương trình tự động khởi động chạy lại từ đầu"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi ngoại lệ được xử lý thành công trong một khối except tương ứng, nó không làm sập chương trình. Luồng thực thi chuyển sang except, rồi chạy tiếp một cách trơn tru các lệnh phía sau cấu trúc try-except."
  },
  {
    id: 13002,
    category: Category.DEBUGGING_TESTING,
    questionText: "Điều gì xảy ra nếu một ngoại lệ phát sinh mà KHÔNG có bất kỳ khối except tương ứng hay khối except mặc định nào bắt lấy nó?",
    options: [
      "A. Python sẽ tự động tạo ra một trình xử lý lỗi mặc định dọn sạch lỗi mà không dừng chương trình",
      "B. Khối finally trong cấu trúc sẽ hoàn toàn bị bỏ qua không thực hiện",
      "C. Lỗi tự động bị lờ đi và chương trình tiếp tục chạy",
      "D. Ngoại lệ được chuyển tiếp lên khung gọi (call stack frame) phía trên tìm kiếm bộ xử lý tiếp theo"
    ],
    correctAnswerIndex: 3,
    explanation: "Ngoại lệ chưa xử lý được chuyển dần ngược lên call stack (các hàm đã gọi hàm hiện tại). Nếu lên đến đỉnh ngoài cùng (module gốc) mà vẫn không ai bắt, chương trình mới sập và in ra luồng Traceback."
  },
  {
    id: 13003,
    category: Category.DEBUGGING_TESTING,
    questionText: "Phát biểu nào sau đây mô tả chính xác nhất về lỗi cú pháp (Syntax Error) trong ngôn ngữ Python?",
    options: [
      "A. Lỗi xảy ra khi thực hiện phép tính chia một số thực cho 0",
      "B. Lỗi hoàn toàn có thể bắt giữ và khắc phục gọn gàng bằng khối try-except",
      "C. Lỗi xuất hiện khi dữ liệu người dùng nhập vào không hợp lệ trong quá trình chạy chương trình",
      "D. Lỗi được trình thông dịch phân tích và phát hiện ra ngay từ khâu phân tách mã nguồn trước khi chương trình thực sự chạy"
    ],
    correctAnswerIndex: 3,
    explanation: "Lỗi cú pháp (Syntax Error) xảy ra khi cấu trúc mã vi phạm quy tắc ngữ pháp của Python. Nó ngăn chặn chương trình bắt đầu chạy và được phát hiện ở giai đoạn biên dịch/thông dịch cú pháp."
  },
  {
    id: 13004,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khi nào thì khối lệnh 'finally' trong cấu trúc try-except-finally chắc chắn được thực thi?",
    options: [
      "A. Chỉ duy nhất khi có ngoại lệ xảy ra trong try",
      "B. Chỉ khi không có bất kỳ ngoại lệ nào phát sinh",
      "C. Luôn luôn được thực thi trong mọi trường hợp, dù ngoại lệ có phát sinh hay được giải quyết hay không",
      "D. Chỉ khi lệnh return được gọi bên trong khối lệnh try"
    ],
    correctAnswerIndex: 2,
    explanation: "Khối 'finally' có tính chất đặc biệt: luôn luôn được thực thi để giải phóng tài nguyên (như đóng tệp tin, ngắt kết nối database), bất chấp việc khối try có chạy suôn sẻ hay quăng lỗi, hay dù có lệnh return sớm."
  },
  {
    id: 13005,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau. Phát biểu nào dưới đây là ĐÚNG về câu lệnh assert này?",
    codeSnippet: `def divide(a, b):
    assert b != 0, "b cannot be zero"
    return a / b`,
    options: [
      "A. Nó sẽ âm thầm tiếp tục thực thi chương trình dẫu b bằng 0",
      "B. Nó sẽ chủ động vấp phải ngoại lệ AssertionError kèm thông điệp 'b cannot be zero' nếu b bằng 0",
      "C. Nó lập tức quăng lỗi ZeroDivisionError trực tiếp khi b bằng 0",
      "D. Nó đảm bảo tính an toàn cho phép chia trong mọi trường hoàn cảnh chạy ở môi trường sản phẩm (production)"
    ],
    correctAnswerIndex: 1,
    explanation: "assert b != 0, 'tin nhắn' khẳng định b bắt buộc phải khác 0. Khi điều kiện b != 0 sai (tức b == 0), Python kích hoạt ngoại lệ AssertionError và mang theo chuỗi thông điệp đi kèm."
  }
];
