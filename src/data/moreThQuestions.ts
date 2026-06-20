import { Question, Category } from "../types";

export const moreThQuestions: Question[] = [
  // ==========================================
  // TH14: File Handling & Libraries (5 Câu)
  // ==========================================
  {
    id: 14001,
    category: Category.FILES_LIBRARIES,
    questionText: "Mục đích chính của việc sử dụng file trong chương trình là gì?",
    options: [
      "A. Tránh sử dụng biến trong chương trình",
      "B. Lưu trữ dữ liệu bền vững sau khi chương trình kết thúc",
      "C. Tăng tốc độ thực thi chương trình",
      "D. Lưu trữ dữ liệu tạm thời trong bộ nhớ"
    ],
    correctAnswerIndex: 1,
    explanation: "Sử dụng tệp tin (file) giúp dữ liệu được ghi xuống đĩa cứng (bộ nhớ ngoài), do đó thông tin sẽ được lưu giữ bền vững và không bị mất đi sau khi chương trình dừng chạy hay máy tắt."
  },
  {
    id: 14002,
    category: Category.FILES_LIBRARIES,
    questionText: "Chế độ mở file nào cho phép ghi đè nội dung cũ hoặc tạo file mới nếu chưa tồn tại?",
    options: [
      "A. w",
      "B. r",
      "C. rw",
      "D. a"
    ],
    correctAnswerIndex: 0,
    explanation: "Chế độ 'w' (write) mở tệp để ghi dữ liệu. Nếu tệp đã tồn tại, toàn bộ nội dung cũ sẽ bị ghi đè (xóa sạch). Nếu tệp chưa tồn tại, Python sẽ tự động tạo một tệp mới."
  },
  {
    id: 14003,
    category: Category.FILES_LIBRARIES,
    questionText: "Câu lệnh nào giúp đảm bảo file luôn được đóng, ngay cả khi có lỗi xảy ra?",
    options: [
      "A. open()",
      "B. with open(...) as f:",
      "C. finally",
      "D. close()"
    ],
    correctAnswerIndex: 1,
    explanation: "Cấu trúc khối 'with open(...) as f:' áp dụng ngữ cảnh quản lý (context manager), tự động giải phóng tài nguyên và đóng tệp an toàn khi luồng thực thi thoát khỏi khối lệnh, kể cả khi có ngoại lệ (lỗi) bất ngờ xảy ra."
  },
  {
    id: 14004,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức nào dùng để đọc toàn bộ nội dung file thành một chuỗi?",
    options: [
      "A. load()",
      "B. readline()",
      "C. read()",
      "D. readlines()"
    ],
    correctAnswerIndex: 2,
    explanation: "Phương thức f.read() đọc toàn bộ nội dung còn lại của tệp tin và trả về dưới dạng một chuỗi văn bản (string) duy nhất."
  },
  {
    id: 14005,
    category: Category.FILES_LIBRARIES,
    questionText: "Hàm nào dùng để kiểm tra sự tồn tại của file hoặc thư mục?",
    options: [
      "A. os.isfile()",
      "B. os.path.exists()",
      "C. os.exist()",
      "D. os.check()"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm os.path.exists(path) thuộc thư viện os của Python nhận vào đường dẫn và trả về True nếu đường dẫn đó thực sự tồn tại dưới dạng một tệp hoặc thư mục."
  },

  // ==========================================
  // TH6: Functions, Scope, Assert & Debug (16 Câu)
  // ==========================================
  {
    id: 6001,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Phát biểu nào đúng nhất về “function specification” (đặc tả hàm)?",
    options: [
      "A. Chỉ cần code chạy được là đủ",
      "B. Đặc tả mô tả hàm nhận gì, trả về gì, và điều kiện/ý nghĩa kết quả",
      "C. Đặc tả chỉ là phần comment cho đẹp mắt",
      "D. Đặc tả thay thế hoàn toàn việc kiểm thử (test)"
    ],
    correctAnswerIndex: 1,
    explanation: "Đặc tả hàm mô tả tổng quan hợp đồng hành vi của hàm: chỉ ra các đầu vào (tham số), điều kiện tiên quyết, đầu ra (kiểu trả về) và lỗi có thể quăng ra, giúp người dùng hiểu cách sử dụng mà không cần đọc dòng code thuật toán."
  },
  {
    id: 6002,
    category: Category.DEBUGGING_TESTING,
    questionText: "Bạn viết một hàm: \ndef avg(a, b):\n    return (a + b) / 2\n\nKiểm thử (test) nào sau đây bắt lỗi tốt nhất nếu ai đó lỡ sửa nhầm thuật toán trong thân hàm thành (a+b)/3?",
    codeSnippet: 'def avg(a, b):\n    return (a + b) / 2',
    options: [
      "A. assert avg(2, 4) == 2",
      "B. assert avg(2, 4) == 3",
      "C. assert avg(0, 0) == 0",
      "D. assert avg(-1, 1) == 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Nếu hàm bị sửa nhầm thành (a+b)/3: \n- avg(2, 4) sẽ tính ra (2+4)/3 = 2.0. \nNhưng phép kiểm thử 'assert avg(2, 4) == 3' mong đợi kết quả là 3. Vì thế 2.0 == 3 bị sai và ném AssertionError, kịp thời phát hiện ra bug. Các test khác: avg(0,0)=0 và avg(-1,1)=0, cả hai công thức /2 hay /3 đều cho ra kết quả bẫy là 0 nên không bắt được lỗi."
  },
  {
    id: 6003,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Xét đoạn mã sau, giá trị in ra màn hình là bao nhiêu và tại sao?",
    codeSnippet: "x = 10\ndef my_func():\n    x = 5\nmy_func()\nprint(x)",
    options: [
      "A. Lỗi UnboundLocalError",
      "B. 10, vì việc gán x = 5 bên trong hàm tạo ra một biến cục bộ mới",
      "C. 15, vì Python cộng dồn các giá trị trùng tên",
      "D. 5, vì hàm đã thay đổi giá trị của biến toàn cục"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi gán x = 5 bên trong một hàm mà không có khai báo 'global x', Python tự động coi x là một biến cục bộ (local variable) của riêng hàm đó. Nó không ảnh hưởng đến biến toàn cục x = 10 ở bên ngoài. Do đó lệnh print(x) ngoài cùng in ra 10."
  },
  {
    id: 6004,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Cho đoạn mã python sau, kết quả sau khi chạy đoạn code trên là:",
    codeSnippet: "def m(a, b=1, c=2):\n    return a + 10*b + 100*c\nprint(m(3), m(3, c=0), m(3, 0, 1))",
    options: [
      "A. 213 13 103",
      "B. 213 3 103",
      "C. 213 13 13",
      "D. 123 13 103",
      "E. 213 3 13"
    ],
    correctAnswerIndex: 0,
    explanation: "1) m(3) dùng mặc định b=1, c=2 -> 3 + 10*1 + 100*2 = 213.\n2) m(3, c=0) truyền keyword c, dùng mặc định b=1 -> 3 + 10*1 + 100*0 = 13.\n3) m(3, 0, 1) truyền tuần tự a=3, b=0, c=1 -> 3 + 10*0 + 100*1 = 103."
  },
  {
    id: 6005,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đặc tả (Specification) của hàm sau đây. Hãy xác định dòng mã nào bị thiếu hoặc sai logic để hàm hoạt động đúng cấu trúc thiết kế và đảm bảo tính bền vững?",
    codeSnippet: `def calculate_average(scores):
    """
    Tính điểm trung bình từ danh sách scores.
    Input: scores (list of numbers)
    Output: float - điểm trung bình.
    Raises: ValueError nếu scores trống.
    """
    # [VỊ TRÍ CẦN KIỂM TRA]
    total = sum(scores)
    return total / len(scores)`,
    options: [
      "A. Cần thêm: assert scores != [], \"List is empty\" vào vị trí kiểm tra",
      "B. Cần thêm: if len(scores) == 0: raise ValueError(\"Empty list\")",
      "C. Cần thêm: if scores == None: return 0",
      "D. Cần sửa sum(scores) thành một vòng lặp for để kiểm tra từng phần tử."
    ],
    correctAnswerIndex: 1,
    explanation: "Đặc tả yêu cầu quăng lỗi cụ thể: 'Raises: ValueError nếu scores trống'. Việc kiểm tra độ dài bằng 0 và quăng lỗi thông qua raise ValueError làm đúng theo đúng hợp đồng thiết kê mô tả."
  },
  {
    id: 6006,
    category: Category.RECURSION_OOP,
    questionText: "Phân tích đoạn mã dưới đây. Khi thực thi, chương trình sẽ dừng lại (tung ra lỗi AssertionError) ở dòng kiểm thử (assert) nào?",
    codeSnippet: `def power(base, exp):
    if exp == 0: return 1
    if exp < 0: return 1 / power(base, -exp)
    return base * power(base, exp - 1)

# Test cases
assert power(2, 3) == 8      # Dòng 1
assert power(5, 0) == 1      # Dòng 2
assert power(2, -1) == 0.5   # Dòng 3
assert power(-2, 2) == -4    # Dòng 4
assert power(10, 2) == 100   # Dòng 5`,
    options: [
      "A. Dòng 1",
      "B. Dòng 3",
      "C. Dòng 4",
      "D. Dòng 5",
      "E. Không có dòng nào, tất cả các test đều vượt qua"
    ],
    correctAnswerIndex: 2,
    explanation: "Hàm lũy thừa: power(-2, 2) tương đương (-2)**2 = 4. Tuy nhiên lệnh assert ở dòng 4 lại khẳng định power(-2, 2) == -4. Vì thế phép kiểm thử bị sai và làm phát sinh lỗi AssertionError ngay lập tức tại đây."
  },
  {
    id: 6007,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét đặc tả hàm clamp(x, lo, hi):\n- Trả về x nếu lo <= x <= hi\n- Trả về lo nếu x < lo\n- Trả về hi nếu x > hi\n\nMột lập trình viên viết code bị lỗi logic như sau:\ndef clamp(x, lo, hi):\n    if x < lo:\n        return lo\n    if x > hi:\n        return hi\n    return hi\n\nBộ kiểm thử nào dưới đây chắc chắn giúp phát hiện lỗi sai này?",
    codeSnippet: `def clamp(x, lo, hi):
    if x < lo:
        return lo
    if x > hi:
        return hi
    return hi`,
    options: [
      "A. assert clamp(-1, 0, 10) == 0",
      "B. assert clamp(11, 0, 10) == 10",
      "C. assert clamp(0, 0, 10) == 0",
      "D. assert clamp(10, 0, 10) == 10",
      "E. assert clamp(5, 0, 10) == 5"
    ],
    correctAnswerIndex: 4,
    explanation: "Đối với lời gọi clamp(5, 0, 10): x=5, lo=0, hi=10. \n- Theo đặc tả: 0 <= 5 <= 10 nên hàm phải trả về 5. \n- Nhưng code bị lỗi: kiểm tra x < lo (5 < 0) là False; x > hi (5 > 10) là False; và cuối cùng dòng lệnh mặc định trả về hi (10). Do thiết lập kiểm thử: 'assert clamp(5, 0, 10) == 5' mong đợi 5 nhưng hàm trả về 10, nên assert bị vi phạm và vạch mặt lỗi code ngay lập tức."
  },
  {
    id: 6008,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Đâu là kết quả đầu ra của đoạn mã sau khi sử dụng biểu thức lambda?",
    codeSnippet: "def writer():\n    title = 'Sir'\n    name = (lambda x: title + ' ' + x)\n    return name\nwho = writer()\nprint(who('Arthur'))",
    options: [
      "A. Arthur Sir",
      "B. Sir Arthur",
      "C. Arthur",
      "D. Không đáp án nào đúng"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm writer() đóng gói biến cục bộ title = 'Sir'. Lớp lambda x nhận dạng và tự động giữ lại tham chiếu (closure) tới biến 'title' bên ngoài. Khi gọi who('Arthur'), lambda ghép chúng thành 'Sir' + ' ' + 'Arthur' = 'Sir Arthur'."
  },
  {
    id: 6009,
    category: Category.DEBUGGING_TESTING,
    questionText: "Yêu cầu: Nhập một chuỗi từ bàn phím, chuyển toàn bộ thành chữ thường, rồi in ra. Xét đoạn mã lỗi sau, kết quả thực thi đoạn mã in ra là gì?",
    codeSnippet: "text = input\nresult = text.lower\nprint(result)",
    options: [
      "A. In ra chuỗi người dùng đã nhập dưới dạng chữ thường - đúng yêu cầu",
      "B. In ra chuỗi người dùng đã nhập - sai do thiếu .lower()",
      "C. In ra một mô tả đối tượng hàm (function object) - do thiếu cặp ngoặc tròn khi gọi hàm",
      "D. Lỗi TypeError do phương thức lower không nhận tham số"
    ],
    correctAnswerIndex: 2,
    explanation: "Trong lệnh text = input, dấu ngoặc () bị bỏ quên nên biến 'text' chỉ tham chiếu tới hàm input chứ không chạy hàm. Tương tự, text.lower tham chiếu tới đối tượng hàm lower. print(result) sẽ in ra chuỗi đại diện mô tả hàm <built-in method lower of ...>."
  },
  {
    id: 6010,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Xét yêu cầu tính tổng tiền phải trả gồm: price (giá gốc), tax (thuế), discount (giảm giá) theo thuật toán cho sẵn. Khi thực thi đoạn mã sử dụng sau, giá trị in ra là gì?",
    codeSnippet: `def calculate_total(price, tax, discount):
    return price + price * tax / 100 - price * discount / 100

total = calculate_total(200, discount=10, tax=5)
print(total)`,
    options: [
      "A. 195.0",
      "B. 210.0",
      "C. 190.0",
      "D. Lỗi TypeError",
      "E. 200.0"
    ],
    correctAnswerIndex: 2,
    explanation: "Lệnh gọi calculate_total kết hợp truyền đối số theo thứ tự (positional argument: price = 200) và truyền theo tên (keyword arguments: discount = 10, tax = 5). Biểu thức tính: 200 + (200 * 5 / 100) - (200 * 10 / 100) = 200 + 10 - 20 = 190.0."
  },
  {
    id: 6011,
    category: Category.DEBUGGING_TESTING,
    questionText: "Giả sử hàm calculate_discount(price, is_member) sau đây bị thiếu câu lệnh trả về kết quả (return). Lệnh assert nào dưới đây sẽ quăng ra AssertionError khi kiểm thử hàm hiện tại?",
    codeSnippet: `def calculate_discount(price, is_member):
    if is_member:
        final_price = price * 0.9
    else:
        final_price = price

assert calculate_discount(100, False) == None # Dòng test 1
assert calculate_discount(100, False) == 100  # Dòng test 2`,
    options: [
      "A. Dòng test số 1",
      "B. Dòng test số 2",
      "C. Không dòng nào gây lỗi",
      "D. Cả hai dòng đều sẽ quăng ra lỗi"
    ],
    correctAnswerIndex: 1,
    explanation: "Do thiếu lệnh return, hàm calculate_discount luôn luôn trả về giá trị None mặc định. Do đó, kiểm thử dòng 1 (None == None) là True. Kiểm thử dòng 2 (None == 100) bị sai, phát sinh AssertionError."
  },
  {
    id: 6012,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Phát biểu nào sau đây mô tả đúng nhất về đặc tả (specification) của một hàm?",
    options: [
      "A. Mô tả chi tiết cách thức cài đặt từng dòng thuật toán cụ thể trong thân hàm.",
      "B. Mô tả hành vi ngoài của hàm (hàm làm gì): gồm tham số đầu vào, kết quả trả về, giải thích nghiệp vụ và thường viết trong docstring.",
      "C. Chỉ bao gồm tên hàm và danh sách biến mà không cần bất kỳ bình luận mô tả nào.",
      "D. Là một tài liệu hướng dẫn nằm ở một file văn bản độc lập hoàn toàn bên ngoài dự án."
    ],
    correctAnswerIndex: 1,
    explanation: "Đặc tả mô tả rõ nét hành vi và giao ước ngoài của hàm (Contract), định hình giao diện giao tiếp của hàm với môi trường bên phát triển."
  },
  {
    id: 6013,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trong file kiểm thử, câu lệnh sau mang ý nghĩa gì?\nassert fib(10) == 55",
    options: [
      "A. Luôn bắt buộc Python in ra số 55 lên cửa sổ dòng lệnh.",
      "B. Nếu kết quả tính của fib(10) là khác 55, phần mềm vẫn tiếp tục chạy, chỉ in cảnh báo lỗi.",
      "C. Kiểm nghiệm giá trị: nếu fib(10) khác 55 thì lập tức quăng lỗi AssertionError dừng chương trình và đánh dấu test thất bại.",
      "D. Ép buộc hàm fib(10) luôn phải trả về kết quả cứng là 55."
    ],
    correctAnswerIndex: 2,
    explanation: "assert biểu diễn một điều kiện xác thực. Nếu giá trị biểu thức so sánh bị sai lệch, ngoại lệ AssertionError được thông báo để chỉ ra lỗi sai của thuật toán so với giá trị kỳ vọng."
  },
  {
    id: 6014,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khi một ca kiểm thử (test case) chạy thất bại, hành động ứng phó nào khoa học và phù hợp nhất?",
    options: [
      "A. Xóa bỏ hoàn toàn ca kiểm thử đó khỏi file kiểm thử vì quá phức tạp.",
      "B. Chỉnh sửa tùy tiện, ngẫu nhiên nhiều chỗ trong mã nguồn cho đến khi không báo lỗi.",
      "C. Tạm lờ lỗi kiểm thử đi và tiếp tục triển khai xây dựng các tính năng mới khác.",
      "D. Đọc kỹ thông điệp báo lỗi (error message), trace thủ công tìm nguyên nhân, sửa đổi chính xác và chạy lại toàn bộ tập kiểm thử."
    ],
    correctAnswerIndex: 3,
    explanation: "Quy trình debug khoa học đòi hỏi sự thấu hiểu thông điệp và nguyên nhân gốc trước khi sửa đổi, đảm bảo sửa đúng chỗ và không vô tình bẻ gãy các test case cũ sẵn có."
  },
  {
    id: 6015,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho định nghĩa hàm sau. Khẳng định nào sau đây về việc kiểm thử hàm này là đúng?",
    codeSnippet: `def check_value(n):
    """Kiểm tra số n.
    Trả về True nếu n là số dương, ngược lại False."""
    return n > 0`,
    options: [
      "A. Lệnh: assert check_value(5) == True sẽ chạy trôi chảy, không gây ra lỗi",
      "B. Lệnh: assert check_value(-1) == True sẽ chạy trôi chảy, không phát sinh lỗi",
      "C. Hàm trên sẽ tự động tung ra lỗi AssertionError nếu truyền đối số n = 0",
      "D. Bình luận docstring hoàn toàn không mô tả thông tin nào về kiểu giá trị trả về."
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm check_value(5) trả về True (do 5 > 0). Câu lệnh assert check_value(5) == True kiểm tra True == True, kết quả đúng nên hoàn toàn không gây ra lỗi nào."
  },
  {
    id: 6016,
    category: Category.ALGORITHMS,
    questionText: "Cho đoạn mã python mô phỏng 1 lượt quét của thuật toán sắp xếp nổi bọt (Bubble Sort) sau. Kết quả hiển thị mảng 'a' sau khi chạy xong là gì?",
    codeSnippet: `a = [5, 1, 4, 2]
for i in range(len(a) - 1):
    if a[i] > a[i+1]:
        a[i], a[i+1] = a[i+1], a[i]
print(a)`,
    options: [
      "A. [1, 2, 4, 5]",
      "B. [1, 4, 2, 5]",
      "C. [5, 1, 2, 4]",
      "D. [1, 5, 4, 2]"
    ],
    correctAnswerIndex: 1,
    explanation: "Lượt quét chạy từ i=0 đến 2:\n- i=0: a[0] (5) > a[1] (1) -> swap -> a = [1, 5, 4, 2]\n- i=1: a[1] (5) > a[2] (4) -> swap -> a = [1, 4, 5, 2]\n- i=2: a[2] (5) > a[3] (2) -> swap -> a = [1, 4, 2, 5]. Số lớn nhất (5) đã trôi về cuối mảng."
  },

  // ==========================================
  // TH05: Loop, Slicing & Mutable Defaults (15 Câu)
  // ==========================================
  {
    id: 5001,
    category: Category.PYTHON_LOOPS,
    questionText: "Kết quả của đoạn mã tính tổng bằng loops sau là gì?",
    codeSnippet: "s = 0\nfor i in range(1, 4):\n    s += i\nprint(s)",
    options: [
      "A. 3",
      "B. 6",
      "C. 10",
      "D. 12"
    ],
    correctAnswerIndex: 1,
    explanation: "range(1, 4) sản sinh chuỗi lặp [1, 2, 3]. Phép cộng dồn s = 1 + 2 + 3 = 6."
  },
  {
    id: 5002,
    category: Category.PYTHON_LOOPS,
    questionText: "Đoạn code sau sử dụng lệnh 'continue' sẽ in ra gì?",
    codeSnippet: "for i in range(3):\n    if i == 1:\n        continue\n    print(i)",
    options: [
      "A. 0 1 2",
      "B. 0 2",
      "C. 1",
      "D. Không in gì"
    ],
    correctAnswerIndex: 1,
    explanation: "range(3) tạo các chỉ số 0, 1, 2. Khi i = 1, lệnh continue kích hoạt, lập tức bỏ qua lệnh print(i) phía dưới và nhảy tới vòng lặp kế tiếp (i=2). Do đó in ra màn hình là 0 và 2."
  },
  {
    id: 5003,
    category: Category.PYTHON_LOOPS,
    questionText: "Hãy phân tích hoạt động của thuật toán sau và chọn câu trả lời đúng nhất về kết quả in ra màn hình:",
    codeSnippet: `s = 0
for i in range(1, 10):
    if i % 2 == 0:
        continue
    if i > 7:
        break
    s += i
print(s)`,
    options: [
      "A. 16 (Tổng các số lẻ nhỏ hơn 8)",
      "B. 25 (Tổng các số lẻ nhỏ hơn 10)",
      "C. 9 (Tổng các số lẻ nhỏ hơn hoặc bằng 5)",
      "D. 12"
    ],
    correctAnswerIndex: 0,
    explanation: "Duyệt qua các số lẻ 1, 3, 5, 7, 9. Với i = 8 (chẵn) vòng lặp nhảy tiếp, i = 9 (lẻ và >7) làm dừng lặp (break). Tổng các số chốt lại s = 1 + 3 + 5 + 7 = 16 (tổng số lẻ nhỏ hơn 8)."
  },
  {
    id: 5004,
    category: Category.PYTHON_LOOPS,
    questionText: "Dự đoán giá trị biến điều khiển 'count' sau khi thực thi các vòng lặp nested loop sau:",
    codeSnippet: `count = 0
for x in range(3):
    for y in range(3):
        if x == y:
            break
        count += 1
print(count)`,
    options: [
      "A. 3",
      "B. 6",
      "C. 0",
      "D. 9"
    ],
    correctAnswerIndex: 0,
    explanation: "- x=0: y=0 -> x==y -> break. count=0\n- x=1: y=0 (count=1), y=1 -> x==y -> break. count=1\n- x=2: y=0 (count=2), y=1 (count=3), y=2 -> break. count=3."
  },
  {
    id: 5005,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho chuỗi s = 'Python Programming'. Lệnh nào dưới đây trích xuất rồi đảo ngược từ 'Python' thành 'nohtyP' một cách chuẩn xác?",
    options: [
      "A. s[0:6][::-1]",
      "B. s[:6:-1]",
      "C. s[6:0]",
      "D. s[::-1][0:6]"
    ],
    correctAnswerIndex: 0,
    explanation: "s[0:6] lấy ra chuỗi con 'Python'. Sau đó lát cắt [::-1] đảo lộn chuỗi con này thành 'nohtyP'. (Cách D thực hiện đảo ngược trước thu được 'gnimmargorP nohtyP' và trích 6 chữ cái đầu là 'gnimma' - sai)."
  },
  {
    id: 5006,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Phân tích tác động của tham số mặc định kiểu khả biến (mutable default argument) trong hàm sau:",
    codeSnippet: `def add(x, L=[]):
    if L is None:
        L = []
    L.append(x)
    return L
print(add(1), add(2), add(3))`,
    options: [
      "A. [1] [2] [3]",
      "B. 1 2 3",
      "C. [1] [1, 2] [1, 2, 3]",
      "D. [1, 2, 3]",
      "E. Chương trình báo lỗi thực thi"
    ],
    correctAnswerIndex: 2,
    explanation: "Trong Python, danh sách mặc định L=[] khởi tạo duy nhất một lần tại thời điểm định nghĩa hàm. Vì thế cả 3 lần gọi add() không truyền tham số thứ hai đều chia sẻ chung một danh sách đó, lần lượt thêm phần tử tích lũy thu được kết quả: [1] [1, 2] [1, 2, 3]."
  },
  {
    id: 5007,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Đầu ra in ra màn hình của đoạn mã xử lý chuỗi sau là gì?",
    codeSnippet: `data = 'a1b2c3d4'
res = ''
for char in data:
    if char.isdigit():
        res += str(int(char) * 2)
    else:
        res += char.upper()
print(res)`,
    options: [
      "A. A2B4C6D8",
      "B. A1B2C3D4",
      "C. a2b4c6d8",
      "D. ABCD"
    ],
    correctAnswerIndex: 0,
    explanation: "Vòng lặp duyệt: Ký tự chữ ('a','b','c','d') bị viết hoa thành ('A','B','C','D'). Ký tự số ('1','2','3','4') được ép kiểu nguyên rồi nhân đôi ('2','4','6','8'). Kết quả ghép lại là 'A2B4C6D8'."
  },
  {
    id: 5008,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Thực thi đoạn mã tác động biến khả biến và bất biến sau cho kết quả thế nào?",
    codeSnippet: `def modify_data(x, y):
    """Hàm thực hiện thay đổi giá trị của x và y."""
    x = x + 10
    y.append(4)
    return x
val_a = 5
val_b = [1, 2, 3]
result = modify_data(val_a, val_b)
print(f"{val_a}, {val_b}, {result}")`,
    options: [
      "A. 5, [1, 2, 3], 15",
      "B. 15, [1, 2, 3, 4], 15",
      "C. 5, [1, 2, 3, 4], 15",
      "D. 15, [1, 2, 3], 15"
    ],
    correctAnswerIndex: 2,
    explanation: "Biến val_a (kiểu int) bất biến nên giữ nguyên giá trị 5 sau khi truyền qua hàm. Biến val_b (kiểu list) khả biến nên thao tác append(4) sửa đổi trực tiếp đối tượng gốc thành [1, 2, 3, 4]. Biến result lưu kết quả trả về của hàm, là 15."
  },
  {
    id: 5009,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Phân tích kỹ lưỡng các tham chiếu và toán tử gán tại hàm tricky() sau và xác định kết quả đúng:",
    codeSnippet: `def tricky(a):
    b = a
    a = a + [10]
    b += [20]
    a.append(30)
    return a, b
x = [1, 2]
p, q = tricky(x)`,
    options: [
      "A. x = [1, 2, 20]; p = [1, 2, 10, 30]; q = [1, 2, 20] và x is q là True, x is p là False",
      "B. x = [1, 2]; p = [1, 2, 10, 30]; q = [1, 2, 20] và x is q là True, x is p là False",
      "C. x = [1, 2, 20, 30]; p = [1, 2, 10, 30]; q = [1, 2, 20] và các phép so sánh đều False",
      "D. x = [1, 2]; p = [1, 2, 10]; q = [1, 2, 20] và x is q là False"
    ],
    correctAnswerIndex: 0,
    explanation: "1) b = a: cả hai cùng chỉ tới mảng gốc x.\n2) a = a + [10]: tạo đối tượng mới độc lập gắn cho 'a'.\n3) b += [20]: biến đổi tại chỗ (in-place) sửa đổi danh sách gốc x thành [1, 2, 20].\n4) a.append(30): sửa đổi mảng mới a thành [1, 2, 10, 30].\n5) Vì x và q cùng chỉ chung 1 đối tượng nên 'x is q' là True."
  },
  {
    id: 5010,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Xét đoạn mã nguồn sau. Khi kết thúc, giá trị của biến ngoài cùng là bao nhiêu?",
    codeSnippet: `def g(nums):
    nums = nums + [99] # (1)
    nums[0] += 1
lst = [6, 0, 7]
g(lst)
print(lst)`,
    options: [
      "A. [7, 0, 7]",
      "B. [6, 0, 7, 99]",
      "C. [6, 0, 7]",
      "D. [7, 0, 7, 99]"
    ],
    correctAnswerIndex: 2,
    explanation: "Khi thực thi phép cộng nums + [99] trong hàm g(), toán tử '+' tạo ra một danh sách mới hoàn toàn trong bộ nhớ và gán lại cho biến local 'nums'. any sửa đổi sau đó chỉ ảnh hưởng lên list mới này. lst nguyên thủy bên ngoài vẫn giữ nguyên trạng thái [6, 0, 7]."
  },
  {
    id: 5011,
    category: Category.PYTHON_LOOPS,
    questionText: "Giả sử s = 'hungnt'. Đoạn code in dải ký tự sau in ra gì?",
    codeSnippet: "for char in s:\n    print(char, end=\"-\")",
    options: [
      "A. h-u-n-g-n-t-",
      "B. hungnt",
      "C. 0-1-2-3-4-5-",
      "D. Báo lỗi cú pháp"
    ],
    correctAnswerIndex: 0,
    explanation: "Vòng lặp duyệt qua từng ký tự trong chuỗi 'hungnt' và in ra kèm theo ký tự kết thúc là dấu '-' thay vì xuống dòng mặc định."
  },
  {
    id: 5012,
    category: Category.PYTHON_LOOPS,
    questionText: "Đoạn code sau sử dụng hàm phân phối chỉ mục enumerate() sẽ in ra kết quả định dạng thế nào ở dòng đầu tiên?",
    codeSnippet: "for item in enumerate(['a', 'b']):\n    print(item)",
    options: [
      "A. 0",
      "B. 'a'",
      "C. (0, 'a')",
      "D. [0, 'a']"
    ],
    correctAnswerIndex: 2,
    explanation: "Hàm enumerate() trong Python sinh ra các cặp tuple (index, value). Tại vòng lặp đầu tiên, nó trả về cặp số và chữ (0, 'a'), lệnh print in nguyên văn tuple này."
  },
  {
    id: 5013,
    category: Category.PYTHON_BASICS,
    questionText: "Tìm giá trị trả về của biểu thức sử dụng hàm range() sau:\nlist(range(2, 10, 2))",
    options: [
      "A. [2, 4, 6, 8, 10]",
      "B. [2, 4, 6, 8]",
      "C. [0, 2, 4, 6, 8]",
      "D. Báo lỗi cú pháp"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm range(start, stop, step) lấy danh sách từ start=2, tăng dần lên 'step=2' đơn vị và kết thúc sát giới hạn stop (không lấy giá trị 10). Mảng kết quả là [2, 4, 6, 8]."
  },
  {
    id: 5014,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Xét hàm add_item có tham số mặc định khả biến sau, kết quả in ra là gì?",
    codeSnippet: `def add_item(item, box=[]):
    box.append(item)
    return box
print(add_item(1))
print(add_item(2))`,
    options: [
      "A. [1] và [1, 2]",
      "B. [1] và [2]",
      "C. [1, 2] và [1, 2]",
      "D. Lỗi biên dịch chương trình"
    ],
    correctAnswerIndex: 0,
    explanation: "Vì box=[] chia sẻ chung cho các lần gọi, add_item(1) biến đổi list và in [1]. Lần gọi add_item(2) bổ sung tiếp đầu số 2 vào chung danh sách và trả về đối tượng list lúc này có giá trị [1, 2]."
  },
  {
    id: 5015,
    category: Category.PYTHON_LOOPS,
    questionText: "Xét đoạn mã nguồn lặp tính tổng sau, chương trình in ra gì?",
    codeSnippet: "total = 0\nfor x in [2, 5, 1]:\n    total = total + x\nprint(total)",
    options: [
      "A. 2",
      "B. 5",
      "C. 8",
      "D. 0",
      "E. Báo lỗi TypeError"
    ],
    correctAnswerIndex: 2,
    explanation: "Vòng lặp tính toán cộng dồn tất cả các phần tử trong danh sách: 2 + 5 + 1 = 8."
  },

  // ==========================================
  // TH03: Variables, Operators & Expressions (10 Câu)
  // ==========================================
  {
    id: 3001,
    category: Category.PYTHON_BASICS,
    questionText: "Trong ngôn ngữ lập trình Python, biến được khởi tạo chính thức khi nào?",
    options: [
      "A. Khi khai báo trước kiểu dữ liệu rõ ràng",
      "B. Khi gán giá trị cho nó lần đầu tiên",
      "C. Khi gọi lệnh import nạp thư viện",
      "D. Khi bắt đầu chạy chương trình lần thứ hai trở đi"
    ],
    correctAnswerIndex: 1,
    explanation: "Python là ngôn ngữ định kiểu động (dynamically typed). Lập trình viên không cần khai báo kiểu dữ liệu của biến trước, biến tự động sinh ra ngay khi ta đặt lệnh gán giá trị = lần đầu."
  },
  {
    id: 3002,
    category: Category.PYTHON_BASICS,
    questionText: "Tính toán độ ưu tiên toán tử: Giá trị của biểu thức 3 + 4 * 2 là bao nhiêu?",
    options: [
      "A. 14",
      "B. 11",
      "C. 10",
      "D. 7"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép nhân (*) có mức độ ưu tiên cao hơn phép cộng (+). Bi biểu thức thực hiện: 3 + (4 * 2) = 3 + 8 = 11."
  },
  {
    id: 3003,
    category: Category.PYTHON_BASICS,
    questionText: "Toán tử nào được sử dụng để lọc lấy phần dư (phép chia modulo) trong Python?",
    options: [
      "A. /",
      "B. //",
      "C. %",
      "D. **"
    ],
    correctAnswerIndex: 2,
    explanation: "Toán tử % thực hiện phép chia lấy phần dư dư của số này cho số kia (ví dụ 5 % 2 = 1)."
  },
  {
    id: 3004,
    category: Category.PYTHON_BASICS,
    questionText: "Tính toán kết quả của biểu thức sau: 10 // 3",
    options: [
      "A. 3.33",
      "B. 3",
      "C. 4",
      "D. 1"
    ],
    correctAnswerIndex: 1,
    explanation: "Toán tử '//' thực hiện phép chia lấy phần nguyên phần sàn (floor division), kết quả trả về là số nguyên tròn bỏ phần thập phân ở sau (10 // 3 = 3)."
  },
  {
    id: 3005,
    category: Category.PYTHON_BASICS,
    questionText: "Toán tử nào được dùng để thực hiện phép toán lũy thừa trong Python?",
    options: [
      "A. ^",
      "B. *",
      "C. **",
      "D. //"
    ],
    correctAnswerIndex: 2,
    explanation: "Trong Python, toán tử double-asterisk '**' dùng tính lũy thừa. Ví dụ 2**3 là 8."
  },
  {
    id: 3006,
    category: Category.PYTHON_BASICS,
    questionText: "Giá trị của biểu thức toán học 5 % 2 là:",
    options: [
      "A. 2",
      "B. 1",
      "C. 2.5",
      "D. 0"
    ],
    correctAnswerIndex: 1,
    explanation: "5 chia cho 2 được 2 dư 1. Do đó phép modulo % trả về phần dư là 1."
  },
  {
    id: 3007,
    category: Category.PYTHON_BASICS,
    questionText: "Giá trị của biểu thức 2 ** 3 trong Python là:",
    options: [
      "A. 6",
      "B. 8",
      "C. 9",
      "D. 5"
    ],
    correctAnswerIndex: 1,
    explanation: "Tính 2 lũy thừa mũ 3: 2 * 2 * 2 = 8."
  },
  {
    id: 3008,
    category: Category.PYTHON_BASICS,
    questionText: "Tên biến nào sau đây là hoàn toàn hợp vệ và đúng quy tắc định danh của Python?",
    options: [
      "A. 2value (bắt đầu bằng chữ số)",
      "B. my-value (chứa ký tự gạch ngang)",
      "C. my_value (chứa gạch dưới hợp lệ)",
      "D. class (trùng từ khóa hệ thống)"
    ],
    correctAnswerIndex: 2,
    explanation: "Tên biến trong Python chỉ gồm chữ cái, chữ số và gạch dưới '_', đồng thời bắt buộc không được bắt đầu bằng chữ số và không trùng các từ khóa (keywords) hệ thống."
  },
  {
    id: 3009,
    category: Category.PYTHON_BASICS,
    questionText: "Giá trị tính toán của biểu thức sau là bao nhiêu?\n(6 + 2) * 3",
    options: [
      "A. 12",
      "B. 18",
      "C. 24",
      "D. 16"
    ],
    correctAnswerIndex: 2,
    explanation: "Cặp ngoặc tròn có mức ưu tiên cao nhất, tính trước: (6 + 2) = 8. Sau đó thực hiện 8 * 3 = 24."
  },
  {
    id: 3010,
    category: Category.PYTHON_BASICS,
    questionText: "Ký hiệu nào sau đây biểu diễn toán tử so sánh bằng trong Python?",
    options: [
      "A. +",
      "B. =",
      "C. ==",
      "D. //"
    ],
    correctAnswerIndex: 2,
    explanation: "Toán tử '==' kiểm tra quan hệ bằng nhau giữa 2 toán hạng. Toán tử '=' là toán tử gán, không dùng để so sánh."
  },

  // ==========================================
  // TH04: Conditions & Control Flows (20 Câu)
  // ==========================================
  {
    id: 4001,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Trong lập trình Python, mục đích chính của câu lệnh rẽ nhánh 'if' là gì?",
    options: [
      "A. Tạo vòng lặp lướt qua từng phân tử",
      "B. Khởi tạo một hàm chương trình mới",
      "C. Import cài đặt thư viện",
      "D. Chỉ thực thi khối lệnh đi kèm khi điều kiện so sánh được xác nhận là đúng"
    ],
    correctAnswerIndex: 3,
    explanation: "Câu lệnh 'if' cho phép phân nhánh logic điều khiển, khối lệnh lồng thụt lề bên trong if chỉ được chạy khi điều kiện trả về giá trị True."
  },
  {
    id: 4002,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Từ khóa nào được dùng để bao quát xử lý nhánh còn lại khi mọi điều kiện 'if' trước đó đều sai?",
    options: [
      "A. elif",
      "B. default",
      "C. else",
      "D. case"
    ],
    correctAnswerIndex: 2,
    explanation: "Cú pháp 'else' định nghĩa nhánh cuối cùng của cấu trúc rẽ nhánh, hoạt động giống như một chiếc lưới bảo hiểm hứng toàn bộ các trường hợp điều kiện bị trượt ở trên."
  },
  {
    id: 4003,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Từ khóa 'elif' là viết tắt của cụm từ nào và mang ý nghĩa gì?",
    options: [
      "A. Dừng hoạt động chương trình ngay lập tức",
      "B. So khớp hai giá trị dạng chữ cái",
      "C. Là 'else if', dùng kiểm tra một điều kiện rẽ nhánh mới nếu các điều kiện trước đó thất bại",
      "D. Tạo một vòng lặp vô hạn"
    ],
    correctAnswerIndex: 2,
    explanation: "'elif' viết gọn của 'else if'. Nó cho phép kiểm thử chuỗi nhiều điều kiện kề nhau một cách có thứ tự."
  },
  {
    id: 4004,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Cú pháp rẽ nhánh 'if' nào dưới đây được viết chính xác theo chuẩn Python?",
    options: [
      "A. if x > 5 {}",
      "B. if (x > 5) then",
      "C. if x > 5:",
      "D. if x > 5 then:"
    ],
    correctAnswerIndex: 2,
    explanation: "Cú pháp đúng yêu cầu viết từ khóa 'if', biểu diễn điều kiện, và kết thúc bằng dấu hai chấm ':'."
  },
  {
    id: 4005,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Nếu không có bất kỳ điều kiện nào trong chuỗi if / elif đúng, đồng thời cấu trúc không viết nhánh else, thì điều gì xảy ra?",
    options: [
      "A. Trình thông dịch tự động chạy khối lệnh đầu tiên",
      "B. Chương trình quăng lỗi cú pháp SyntaxError",
      "C. Chương trình bị gián đoạn và lập tức treo tắt",
      "D. Toàn bộ khối rẽ nhánh bị bỏ qua một cách an toàn và chương trình tiếp tục thực thi các dòng mã tuần sau đó"
    ],
    correctAnswerIndex: 3,
    explanation: "Khi các điều kiện if/elif đều sai và không có else bắt, luồng thực thi đơn giản đi tiếp qua cấu trúc rẽ nhánh mà không chạy bất kỳ dòng code lồng nào."
  },
  {
    id: 4006,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Kết quả của đoạn mã nguồn sau là gì?",
    codeSnippet: "x = 3\nif x > 5:\n    print('A')\nelse:\n    print('B')",
    options: [
      "A. Không in gì",
      "B. In ra A",
      "C. In ra B",
      "D. Báo lỗi cú pháp"
    ],
    correctAnswerIndex: 2,
    explanation: "Biến x = 3. Điều kiện x > 5 (3 > 5) trả về False, do đó nhánh if bị lướt qua, chương trình nhảy vào nhánh else in chữ 'B'."
  },
  {
    id: 4007,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Cho đoạn mã python phân luồng sau, kết quả sau khi chạy là gì?",
    codeSnippet: "x = 8\nif x > 10:\n    print('A')\nelif x > 5:\n    print('B')\nelse:\n    print('C')",
    options: [
      "A. In ra B",
      "B. Không hiển thị kết quả nào",
      "C. In ra A",
      "D. In ra C"
    ],
    correctAnswerIndex: 0,
    explanation: "x = 8. Điều kiện đầu x > 10 (8 > 10) bị False. Trình thông dịch nhảy sang kiểm tra elif x > 5 (8 > 5), điều kiện này True nên chạy lệnh print('B') tương ứng rồi kết thúc cấu trúc rẽ nhánh."
  },
  {
    id: 4008,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Trong biểu thức điều kiện của Python, toán tử so sánh bằng là ký hiệu nào?",
    options: [
      "A. =",
      "B. !=",
      "C. :=",
      "D. =="
    ],
    correctAnswerIndex: 3,
    explanation: "Toán tử '==' dùng kiểm tra giá trị bằng nhau. Ký tự đơn '=' dùng cho lệnh gán biến."
  },
  {
    id: 4009,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Điều gì sẽ xảy ra nếu lập trình viên cố tình viết dòng lệnh rẽ nhánh dạng: if x = 5:",
    options: [
      "A. Trình thông dịch quăng lỗi cú pháp (SyntaxError) vì dấu '=' là toán tử gán, so sánh phải sử dụng '=='",
      "B. Chương trình chạy ổn định và biểu thức so sánh luôn được hiểu là True",
      "C. Biến x tự động được ép kiểu sang dạng Boolean",
      "D. Python thông minh sẽ tự động chuyển đổi thành dấu '==' để chạy tiếp"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép gán không được chấp nhận làm biểu thức điều kiện rẽ nhánh. Trình thông dịch quăng SyntaxError ngay lập tức trước khi chạy."
  },
  {
    id: 4010,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Đoạn mã nào biểu diễn đúng điều kiện: kiểm tra biến x có nằm chèn giữa trong khoảng từ 1 tới 10 (bao gồm cả hai đầu)?",
    options: [
      "A. if x => 1 and x =< 10:",
      "B. if between(x, 1, 10):",
      "C. if 1 <= x <= 10:",
      "D. if x >= 1 or x <= 10:"
    ],
    correctAnswerIndex: 2,
    explanation: "Python hỗ trợ biểu thức so sánh xích nối chuỗi (chained comparison operators) cực kỳ tự nhiên. Do đó '1 <= x <= 10' là cú pháp vừa đúng, ngắn gọn và đẹp đẽ."
  },
  {
    id: 4011,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Chạy đoạn mã kiểm tra tính chẵn lẻ của số 7 sau cho ra kết quả gì?",
    codeSnippet: "x = 7\nif x % 2 == 0:\n    print('chan')\nelse:\n    print('le')",
    options: [
      "A. In ra chan",
      "B. In ra le",
      "C. Không in gì",
      "D. Báo lỗi cú pháp"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép modulo 7 % 2 trả về 1. Điều kiện 1 == 0 bị False, thế nên luồng thực thi tìm tới nhánh else và thực hiện in chữ 'le'."
  },
  {
    id: 4012,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Trong ngôn ngữ Python, cấu trúc match ... case vừa ra mắt được sử dụng chủ yếu để làm gì?",
    options: [
      "A. Thực hiện so khớp mẫu (structural pattern matching) một giá trị với nhiều trường hợp/khuôn dạng điều kiện khác nhau",
      "B. Thiết kế và khai báo cấu trúc tầng của một Class mới",
      "C. Ép kiểu dữ liệu đồng loạt sang kiểu chuỗi",
      "D. Tạo ra một vòng lặp lồng nhau"
    ],
    correctAnswerIndex: 0,
    explanation: "match...case đem lại tính năng so khớp mẫu cực kỳ mạnh mẽ, giúp cấu trúc code đẹp đẽ và sạch sẽ hơn nhiều so với việc viết chuỗi dài các lệnh if-elif-else liên tiếp."
  },
  {
    id: 4013,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Từ phiên bản cụ thể nào của trình biên dịch Python, cú pháp rẽ nhánh match ... case mới được chính thức hỗ trợ?",
    options: [
      "A. Python 3.8",
      "B. Python 3.6",
      "C. Python 3.10",
      "D. Python 2.7"
    ],
    correctAnswerIndex: 2,
    explanation: "Cấu trúc match ... case (PEP 634) được thông qua và phát hành kể từ phiên bản Python 3.10 trở đi."
  },
  {
    id: 4014,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Đầu ra in ra màn hình của đoạn mã so khớp match-case mẫu sau là gì?",
    codeSnippet: "x = 2\nmatch x:\n    case 1:\n        print('mot')\n    case 2:\n        print('hai')\n    case _:\n        print('khac')",
    options: [
      "A. In ra khac",
      "B. In ra mot",
      "C. Báo lỗi cú pháp",
      "D. In ra hai"
    ],
    correctAnswerIndex: 3,
    explanation: "Giá trị x = 2 khớp hoàn hảo với khuôn mẫu của 'case 2', trình chạy in ra chữ 'hai' rồi thoát luồng khớp."
  },
  {
    id: 4015,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Trong khối cấu trúc match ... case, mẫu ký tự gạch dưới '_' đảm nhận vai trò gì?",
    options: [
      "A. Là một biến đại diện bắt buộc thuộc kiểu số nguyên dương",
      "B. Toán tử dùng để ghép chuỗi ký tự",
      "C. Là mẫu đại diện vạn năng (wildcard/default pattern) để thu nhận tất cả trường hợp không trùng khớp với các case viết trước nó",
      "D. Câu lệnh tắt hỗ trợ bỏ qua các lỗi thời gian chạy dòng lệnh"
    ],
    correctAnswerIndex: 2,
    explanation: "Dấu gạch dưới '_' đóng vai trò giống như khối 'default' của câu lệnh switch-case ở các ngôn ngữ khác, bắt giữ mọi giá trị trượt."
  },
  {
    id: 4016,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Đoạn mã match-case nào sau đây là hoàn toàn đúng để kiểm tra xem biến x có bằng 1 hoặc bằng 2?",
    options: [
      "A. match x: case (1, 2): print('hop le')",
      "B. match x: case 1 or 2: print('hop le')",
      "C. match x: case x == 1 or x == 2: print('hop le')",
      "D. match x: case 1 | 2: print('hop le')"
    ],
    correctAnswerIndex: 3,
    explanation: "Trong match-case, toán tử '|' (OR pattern) được sử dụng để ghép nối các mẫu thay thế. 'case 1 | 2' khớp khi x là 1 hoặc 2."
  },
  {
    id: 4017,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Chạy thử đoạn mã cấu trúc if lồng nhau (nested if) sau, kết quả thu được là gì?",
    codeSnippet: "x = 15\nif x > 0:\n    if x < 10:\n        print('nho')\n    else:\n        print('lon')",
    options: [
      "A. In ra nho",
      "B. In ra lon",
      "C. Báo lỗi IndentationError thụt dòng",
      "D. Không hiển thị kết quả"
    ],
    correctAnswerIndex: 1,
    explanation: "Do x=15 > 0, chương trình chui vào khối lệnh if lồng. Tại đây, điều kiện x < 10 (15 < 10) bị False. Luồng tìm tới nhánh else lồng tương ứng và thực thi lệnh in chữ 'lon'."
  },
  {
    id: 4018,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Trong việc thiết lập các câu lệnh if can thiệp lồng nhau sâu, yếu tố cú pháp nào là tối quan trọng để Python biên dịch chính xác?",
    options: [
      "A. Bắt buộc bao quanh tất cả các biểu thức logic so sánh bằng ngoặc đơn ()",
      "B. Viết dấu chấm phẩy ';' báo hiệu kết thúc ở cuối mỗi dòng lệnh",
      "C. Thụt lề đầu dòng (indentation) đồng bộ và chính xác tuyệt đối",
      "D. Dùng từ khóa 'endif' đặt ở cuối để kết thúc toàn bộ khối rẽ nhánh"
    ],
    correctAnswerIndex: 2,
    explanation: "Python sử dụng khoảng lùi thụt lề để xác định phân cấp ranh giới của khối mã (scope block) thay vì dùng ngoặc nhọn {}. Thụt dòng chính xác là chìa khóa sống còn."
  },
  {
    id: 4019,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Cho đoạn mã python sau, kết quả sau khi chạy đoạn code là gì?",
    codeSnippet: "x = 0\nif x:\n    print('co gia tri')\nelse:\n    print('khong co gia tri')",
    options: [
      "A. In ra khong co gia tri",
      "B. In ra co gia tri",
      "C. Không in ra bất kỳ kết quả nào",
      "D. Trình thông dịch báo lỗi TypeError vì giá trị của x không thuộc kiểu Boolean"
    ],
    correctAnswerIndex: 0,
    explanation: "Trong Python, số nguyên 0 được tự động quy đổi thành False trong phép thử logic. Do đó luồng chạy trượt thẳng vào nhánh else và thực hiện in chữ 'khong co gia tri'."
  },
  {
    id: 4020,
    category: Category.PYTHON_CONDITIONS,
    questionText: "Khi thực thi match-case phân rã dữ liệu tuple sau, giá trị in ra màn hình là gì?",
    codeSnippet: "point = (0, 5)\nmatch point:\n    case (0, y):\n        print(y)\n    case (x, 0):\n        print(x)\n    case _:\n        print('khac')",
    options: [
      "A. In ra 5",
      "B. In ra khac",
      "C. Báo lỗi cú pháp",
      "D. In ra 0"
    ],
    correctAnswerIndex: 0,
    explanation: "point = (0, 5). match thực hiện giải nén so khớp: nó khớp với cấu trúc mẫu 'case (0, y)' vì phần tử thứ nhất của tuple là 0. Biến 'y' lập tức được trích xuất (bind) nhận giá trị của phần tử thứ hai là 5. Do đó print(y) in ra 5."
  }
];
