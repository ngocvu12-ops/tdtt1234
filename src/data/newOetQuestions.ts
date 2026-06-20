import { Question, Category } from "../types";

export const newOet100Questions: Question[] = [
  {
    id: 6001,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (Trace Code kỹ)",
    codeSnippet: "for i in range(1, 3):\n    for j in range(1, 3):\n        if i == j:\n            continue\n        else:\n            print(i, end=\"\")",
    options: [
      "A. 1",
      "B. 2",
      "C. 12",
      "D. 21"
    ],
    correctAnswerIndex: 2,
    explanation: "Khi i = 1, j = 1 -> continue; j = 2 -> in ra i (1). Khi i = 2, j = 1 -> in ra i (2); j = 2 -> continue. Kết quả nối chuỗi cuối cùng là 12."
  },
  {
    id: 6002,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (Short-circuit & Side Effects)",
    codeSnippet: "def f(x):\n    return x * 0\n\ndef g(x):\n    print(\"Call g\")\n    return x\n\nif f(10) and g(10):\n    print(\"True\")\nelse:\n    print(\"False\")",
    options: [
      "A. False \n(và không in gì thêm)",
      "B. True",
      "C. Call g \nFalse",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm f(10) trả về 0 (False). Do cơ chế ngắt mạch (short-circuit evaluation) của toán tử 'and', Python sẽ không gọi tiếp g(10) nữa mà chuyển trực tiếp sang khối else để in 'False'."
  },
  {
    id: 6003,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (For-Else & Break Logic)",
    codeSnippet: "ans = 0\nfor i in range(3):\n    for j in range(3):\n        ans += 1\n        if i + j == 3:\n            break\n    else:\n        ans += 10\nprint(ans)",
    options: [
      "A. 33",
      "B. 3",
      "C. 18",
      "D. 6"
    ],
    correctAnswerIndex: 2,
    explanation: "Vòng lặp ngoài 'for i' chạy bình thường không bị ngắt quãng bởi 'break' (chỉ có vòng lặp trong bị ngắt khi i + j == 3). Vì thế, khối 'else' đi kèm vòng lặp ngoài vẫn được chạy thành công và cộng thêm 10 vào kết quả."
  },
  {
    id: 6004,
    category: Category.PYTHON_BASICS,
    questionText: "Tìm output của đoạn code sau: (Chain Comparison)",
    codeSnippet: "x = 5\nprint(1 < x < 10 > 5 == 5)",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép so sánh xích liên tục trong Python tương đương với giải thuật logic: (1 < x) and (x < 10) and (10 > 5) and (5 == 5). Với x = 5, toàn bộ các mệnh đề nhỏ đều True nên kết quả thu được là True."
  },
  {
    id: 6005,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (While loop trick)",
    codeSnippet: "i = 0\nwhile i < 3:\n    i += 1\n    if i == 2:\n        continue\n    print(i, end=\"\")\nelse:\n    print(\"Else\", end=\"\")",
    options: [
      "A. 13",
      "B. 12",
      "C. 13Else",
      "D. Vòng lặp vô hạn"
    ],
    correctAnswerIndex: 2,
    explanation: "i biến thiên qua các giá trị 1, 2, 3. Tại i=2 vòng lặp rẽ continue bỏ qua lệnh in; tại i=1 và i=3 in ra 1 và 3. Khối else của while luôn thực thi khi vòng lặp kết thúc bình thường."
  },
  {
    id: 6006,
    category: Category.PYTHON_BASICS,
    questionText: "Mức độ ưu tiên của toán tử trong Python: Tìm kết quả xuất ra màn hình",
    codeSnippet: "print(3 * 8 // 4 - 1 + 2)",
    options: [
      "A. 5",
      "B. 7",
      "C. 6",
      "D. 8"
    ],
    correctAnswerIndex: 1,
    explanation: "Độ ưu tiên toán tử: Nhân và chia lấy phần nguyên (*, //) thực hiện trước từ trái qua phải, sau đó đến cộng trừ (+, -). Ta có: 3 * 8 = 24 -> 24 // 4 = 6 -> 6 - 1 + 2 = 7."
  },
  {
    id: 6007,
    category: Category.PYTHON_BASICS,
    questionText: "Output thu được khi thực thi đoạn mã sau là gì? (Nested List Comprehension)",
    codeSnippet: "matrix = [[1, 2], [3, 4]]\nprint(sum([x for row in matrix for x in row if x % 2 == 0]))",
    options: [
      "A. 3",
      "B. 5",
      "C. 6",
      "D. 10"
    ],
    correctAnswerIndex: 2,
    explanation: "List comprehension duyệt phẳng ma trận matrix để chọn ra các phần tử chẵn là [2, 4]. Hàm sum() tổng dồn mảng này cho kết quả 6."
  },
  {
    id: 6008,
    category: Category.PYTHON_BASICS,
    questionText: "Khi thực hiện phép tính số học giữa kiểu Boolean trong Python, kết quả nhận được là:",
    codeSnippet: "print(True + False - True)",
    options: [
      "A. 1",
      "B. 0",
      "C. True",
      "D. -1"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong toán học số nguyên của Python, True đại diện cho giá trị 1 và False đại diện cho số 0. Phép toán tương đương 1 + 0 - 1 = 0."
  },
  {
    id: 6009,
    category: Category.PYTHON_BASICS,
    questionText: "Chương trình dưới đây in ra giá trị gì? (Cú pháp Unpacking)",
    codeSnippet: "a, *b, c = range(5)\nprint(b)",
    options: [
      "A. (1, 2, 3)",
      "B. 1, 2, 3, 4",
      "C. [2, 3, 4]",
      "D. [1, 2, 3]"
    ],
    correctAnswerIndex: 3,
    explanation: "range(5) có các phần tử 0, 1, 2, 3, 4. Biến a gán số đầu (0), c gán số cuối (4). Biến với dấu sao '*b' sẽ gộp toàn bộ các phần tử trung gian còn lại thành danh sách [1, 2, 3]."
  },
  {
    id: 6010,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của hàm func() sau đây là gì? (Try-Finally Flow)",
    codeSnippet: "def func():\n    try:\n        return 1\n    finally:\n        return 2\nprint(func())",
    options: [
      "A. 1",
      "B. 2",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Khối 'finally' luôn được thực thi bắt buộc trước khi hàm trả về kết quả thoát ra ngoài. Giá trị 'return 2' trong finally sẽ ghi đè và thay thế hoàn toàn 'return 1' của try."
  },
  {
    id: 6011,
    category: Category.PYTHON_BASICS,
    questionText: "Giá trị in ra của đoạn chương trình sau là gì? (Late Binding Closure)",
    codeSnippet: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])",
    options: [
      "A. [0, 1, 2]",
      "B. [2, 2, 2]",
      "C. [0, 0, 0]",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Cơ chế Late Binding của Python chỉ tìm giá trị của biến tự do 'i' tại thời điểm gọi hàm lambda thực tế. Khi vòng lặp tạo hàm kết thúc, biến cục bộ 'i' đã dừng ở giá trị cuối cùng là 2. Vì thế cả 3 hàm đều trả về 2."
  },
  {
    id: 6012,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây xuất ra kết quả nào? (Default Mutability)",
    codeSnippet: "def append_to(element, target=[]):\n    target.append(element)\n    return target\n\nprint(append_to(1))\nprint(append_to(2))",
    options: [
      "A. [1] và [2]",
      "B. [1] và [1, 2]",
      "C. [1] và [2, 2]",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Tham số mặc định 'target=[]' là kiểu danh sách có tính khả biến (mutable), chỉ được khởi tạo một lần duy nhất khi nạp chương trình. Tất cả các lần gọi hàm tiếp theo mà không truyền target sẽ dùng chung và sửa đổi cùng một danh sách cũ."
  },
  {
    id: 6013,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của đoạn code sau là gì? (Global vs Local Scope)",
    codeSnippet: "x = 5\ndef func():\n    print(x)\n    x = 10\ntry:\n    func()\nexcept Exception as e:\n    print(type(e).__name__)",
    options: [
      "A. 5",
      "B. 10",
      "C. UnboundLocalError",
      "D. NameError"
    ],
    correctAnswerIndex: 2,
    explanation: "Do lệnh gán 'x = 10' xuất hiện trong hàm, Python mặc định gán nhãn x là biến cục bộ trong toàn bộ phạm vi hàm. Lệnh print(x) nằm trước lệnh gán do đó cố truy cập biến cục bộ chưa khởi tạo, dẫn đến lỗi UnboundLocalError."
  },
  {
    id: 6014,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau hiển thị giá trị nào? (Nonlocal scope)",
    codeSnippet: "def outer():\n    x = \"local\"\n    def inner():\n        nonlocal x\n        x = \"nonlocal\"\n    inner()\n    print(x)\nouter()",
    options: [
      "A. local",
      "B. nonlocal",
      "C. global",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Từ khóa 'nonlocal' báo hiệu cho trình biên dịch rằng biến x ở đây liên kết trực tiếp tới vùng biến cục bộ của hàm chứa nó bên ngoài gần nhất ('outer'). Chạy inner() sẽ sửa x ngoài thành 'nonlocal'."
  },
  {
    id: 6015,
    category: Category.PYTHON_BASICS,
    questionText: "Độ dài tổng hợp thu về của hàm dưới đây là bao nhiêu?",
    codeSnippet: "def func(*args, **kwargs):\n    print(len(args) + len(kwargs))\nfunc(1, 2, x=3, y=4)",
    options: [
      "A. 5",
      "B. 4",
      "C. 3",
      "D. 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Tham số vị trí 1, 2 được đóng gói vào tuple 'args' (len = 2). Tham số đặt tên x=3, y=4 được gộp vào dict 'kwargs' (len = 2). Tổng độ dài là 2 + 2 = 4."
  },
  {
    id: 6016,
    category: Category.PYTHON_BASICS,
    questionText: "Cho định nghĩa hàm sau, khi chạy lệnh func(1, 2) kết quả là gì?",
    codeSnippet: "def func(a, *, b):\n    return a + b\ntry:\n    print(func(1, 2))\nexcept Exception as e:\n    print(\"Error\")",
    options: [
      "A. 3",
      "B. Error",
      "C. None",
      "D. 1"
    ],
    correctAnswerIndex: 1,
    explanation: "Dấu ngôi sao đứng độc lập '*' trong danh sách tham số quy định tất cả đối số đứng sau nó chỉ được truyền dưới dạng tường minh khóa (keyword-only). Gọi func(1, 2) sai cú pháp truyền b nên quăng ra lỗi TypeError."
  },
  {
    id: 6017,
    category: Category.PYTHON_BASICS,
    questionText: "Trình tự hiển thị văn bản của đoạn chương trình sau là gì? (Decorator execution order)",
    codeSnippet: "def dec(f):\n    print(\"Dec\")\n    return f\n@dec\ndef func():\n    pass\nprint(\"Call\")\nfunc()",
    options: [
      "A. Call\nDec",
      "B. Dec\nCall",
      "C. Call",
      "D. Dec"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm trang trí (Decorator) luôn được trình biên dịch thi hành và bọc lớp ngay tại thời điểm định nghĩa hàm gốc, chứ không phải đợi tới lúc có lệnh gọi thực thi hàm gốc."
  },
  {
    id: 6018,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình đệ quy sau đây trả về kết quả gì?",
    codeSnippet: "def f(n):\n    if n <= 1:\n        return 1\n    return n - f(n - 1)\nprint(f(4))",
    options: [
      "A. 3",
      "B. 2",
      "C. 1",
      "D. 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Trace đệ quy: f(4) = 4 - f(3) = 4 - (3 - f(2)) = 4 - (3 - (2 - f(1))) = 4 - (3 - (2 - 1)) = 4 - (3 - 1) = 4 - 2 = 2."
  },
  {
    id: 6019,
    category: Category.PYTHON_BASICS,
    questionText: "Khi chuyển đổi một Generator chứa biểu thức return thành danh sách, kết quả thu được là:",
    codeSnippet: "def gen():\n    yield 1\n    yield 2\n    return 3\nprint(list(gen()))",
    options: [
      "A. [1, 2, 3]",
      "B. [1, 2]",
      "C. [1, 2, None]",
      "D. Lỗi cú pháp"
    ],
    correctAnswerIndex: 1,
    explanation: "Câu lệnh 'return 3' trong hàm generator thực chất báo hiệu kết thúc generator bằng cách ném ra ngoại lệ StopIteration(3). Giá trị 3 đi kèm bị bỏ qua khi dùng list() để thu thập phần tử."
  },
  {
    id: 6020,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau, giá trị in ra màn hình là bao nhiêu? (Lambda scope)",
    codeSnippet: "x = 10\na = lambda y: x + y\nx = 20\nb = lambda y: x + y\nprint(a(10), b(10))",
    options: [
      "A. 20 30",
      "B. 30 30",
      "C. 20 20",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Biến x trong biểu thức lambda là biến tự do được tra cứu tại thời điểm gọi hàm. Khi a(10) và b(10) được gọi, x đã mang giá trị 20, do đó cả hai phép toán đều thực hiện 20 + 10 = 30."
  },
  {
    id: 6021,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy đoạn mã sau trong Python 3 và tìm giá trị hiển thị: (Immutables Caching)",
    codeSnippet: "a = 256\nb = 256\nc = 257\nd = 257\nprint(a is b, c is d)",
    options: [
      "A. True True",
      "B. True False",
      "C. False False",
      "D. False True"
    ],
    correctAnswerIndex: 1,
    explanation: "Python tối ưu tài nguyên bằng cách tạo sẵn bộ đệm số nguyên nhỏ (Small Integer Caching) chạy từ -5 đến 256. Số 257 nằm ngoài vùng đệm, do đó c và d được khởi tạo ở hai ô nhớ hoàn toàn độc lập làm phép toán 'is' (so sánh địa chỉ bộ nhớ) trả về False."
  },
  {
    id: 6022,
    category: Category.PYTHON_BASICS,
    questionText: "Độ dài của danh sách 'a' sau khi kết thúc vòng lặp sau là bao nhiêu? (List Mutation Loop)",
    codeSnippet: "a = [1, 2, 3]\nfor x in a:\n    if x < 4:\n        a.append(x + 3)\nprint(len(a))",
    options: [
      "A. 3",
      "B. 6",
      "C. 5",
      "D. Vòng lặp vô tận"
    ],
    correctAnswerIndex: 1,
    explanation: "Vòng lặp for duyệt tuần tự qua các phần tử của a. Ban đầu x = 1 (<4) -> thêm 4; x=2 (<4) -> thêm 5; x=3 (<4) -> thêm 6. Ba phần tử mới thêm [4, 5, 6] đều lớn hơn hoặc bằng 4 nên khi duyệt đến chúng vòng lặp dừng lại. Số phần tử tổng cộng là 6."
  },
  {
    id: 6023,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy mã nguồn sau và cho biết đầu ra: (Dict Key Hashing)",
    codeSnippet: "d = {}\nd[1] = \"Int\"\nd[1.0] = \"Float\"\nd[True] = \"Bool\"\nprint(len(d), d[1])",
    options: [
      "A. 3 Bool",
      "B. 1 Bool",
      "C. 3 Float",
      "D. 2 Int"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python, 1, 1.0 và True có cùng giá trị logic so sánh bằng và cùng sinh ra mã băm (hash) giống nhau. Do đó, chúng được coi là cùng một khóa duy nhất trong từ điển và giá trị liên tục bị ghi đè thành 'Bool'. Độ dài d là 1."
  },
  {
    id: 6024,
    category: Category.PYTHON_BASICS,
    questionText: "Tập hợp chứa các phần tử sau đây có hình hài thực tế ra sao?",
    codeSnippet: "s = {1, True, 1.0}\nprint(s)",
    options: [
      "A. {1, True, 1.0}",
      "B. {1}",
      "C. {1, 1.0}",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Do set chỉ chứa duy nhất các khóa phân biệt độc lập và triệt tiêu trùng lặp về mặt giá trị/mã băm, chỉ có phần tử đầu tiên hợp lệ (1) được bảo lưu, loại bỏ hoàn toàn True và 1.0."
  },
  {
    id: 6025,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (Shallow Copying)",
    codeSnippet: "a = [[1]] * 2\na[0][0] = 2\nprint(a)",
    options: [
      "A. [[1], [1]]",
      "B. [[2], [2]]",
      "C. [[2], [1]]",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép nhân danh sách `[[1]] * 2` tạo ra một danh sách chứa hai phần tử, nhưng cả hai đều trỏ tới cùng một đối tượng danh sách con là `[1]` trong bộ nhớ (sao chép nông). Sửa đổi thông qua phần tử đầu `a[0][0]=2` sẽ làm thay đổi trên cả hai."
  },
  {
    id: 6026,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã sau là gì? (Shallow Copy vs Deep Copy)",
    codeSnippet: "import copy\na = [1, [2]]\nb = copy.copy(a)\na[1].append(3)\nprint(b)",
    options: [
      "A. [1, [2]]",
      "B. [1, [2, 3]]",
      "C. [1, [2, 3, 3]]",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức copy.copy() thực hiện sao chép nông. Danh sách ngoài b là một danh sách độc lập mới, nhưng danh sách con lồng bên trong [2] vẫn được dùng chung của cả a và b. Hành vi append(3) trên danh sách con của a làm ảnh hưởng tới b."
  },
  {
    id: 6027,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm d.pop('b', 2) trả về kết quả gì từ từ điển sau?",
    codeSnippet: "d = {'a': 1}\nprint(d.pop('b', 2))",
    options: [
      "A. KeyError",
      "B. None",
      "C. 2",
      "D. 1"
    ],
    correctAnswerIndex: 2,
    explanation: "Hàm pop(key[, default]) của từ điển tìm kiếm khóa phát ra. Khóa 'b' không tồn tại, vì có đối số thứ hai mang giá trị mặc định là 2 nên hàm trả về 2 an toàn thay vì ném ra ngoại lệ KeyError."
  },
  {
    id: 6028,
    category: Category.PYTHON_BASICS,
    questionText: "Độ dài của tập hợp dưới đây là bao nhiêu?",
    codeSnippet: "s = {frozenset([1, 2]), frozenset([2, 1])}\nprint(len(s))",
    options: [
      "A. 2",
      "B. 1",
      "C. Error",
      "D. 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Frozenset là tập hợp bất biến, do tính chất của tập hợp không quan tâm tới thứ tự phần tử, frozenset([1, 2]) bằng frozenset([2, 1]) về mặt giá trị. Khi đưa vào set 's', phần tử trùng lặp bị gộp lại và độ dài là 1."
  },
  {
    id: 6029,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy lệnh in sau và cho biết đầu ra định dạng:",
    codeSnippet: "x = 123.456\nprint(f\"{x:06.1f}\")",
    options: [
      "A. 0123.5",
      "B. 123.50",
      "C. 00123.5",
      "D. 123.5"
    ],
    correctAnswerIndex: 0,
    explanation: "Định dạng logic: ':06.1f' chỉ rõ lấy 1 chữ số thập phân (.1f -> làm tròn thành 123.5 có độ rộng là 5 ký tự kể cả dấu chấm). Độ rộng tối thiểu được chỉ định là 6, do đó hệ thống lấp đầy khoảng trắng bằng số 0 ở đầu làm thu về '0123.5'."
  },
  {
    id: 6030,
    category: Category.PYTHON_BASICS,
    questionText: "Gán lát cắt danh sách sau đây làm thay đổi mảng như thế nào?",
    codeSnippet: "a = [0, 1, 2, 3, 4]\na[1::2] = [10, 20]\nprint(a)",
    options: [
      "A. ValueError",
      "B. [0, 10, 2, 20, 4]",
      "C. [0, 10, 20, 3, 4]",
      "D. [0, 1, 10, 20, 4]"
    ],
    correctAnswerIndex: 1,
    explanation: "Cách cắt lát '1::2' thể hiện duyệt từ chỉ mục 1 với bước nhảy là 2, nhắm tới chỉ mục 1 (giá trị 1) và chỉ mục 3 (giá trị 3). Phép gán thay đổi hai giá trị này lần lượt thành 10 và 20."
  },
  {
    id: 6031,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy biểu thức tạo từ điển sau và cho biết kết quả:",
    codeSnippet: "d = {x: y for x in range(2) for y in range(3)}\nprint(d)",
    options: [
      "A. {0: 2, 1: 2}",
      "B. {0: 0, 1: 1, 2: 2}",
      "C. SyntaxError",
      "D. {0: 1, 1: 2}"
    ],
    correctAnswerIndex: 0,
    explanation: "Với mỗi x trong [0, 1], vòng lặp của y liên tục chạy từ 0 đến 2 và ghi đè giá trị khóa x: d[x] = y. Giá trị cuối cùng ghi đè cho x=0 và x=1 đều là y=2. Kết quả là {0: 2, 1: 2}."
  },
  {
    id: 6032,
    category: Category.PYTHON_BASICS,
    questionText: "Có lỗi khi chạy đoạn chương trình thay đổi tuple lồng dính này không?",
    codeSnippet: "t = ([1], 2)\ntry:\n    t[0].extend([2])\nexcept Exception:\n    print(\"Error\")\nprint(t)",
    options: [
      "A. ([1, 2], 2)",
      "B. Error",
      "C. ([1], 2)",
      "D. TupleError"
    ],
    correctAnswerIndex: 0,
    explanation: "Mặc dù bản thân tuple t bất biến và không cho phép gán trực tiếp, phần tử tại chỉ mục 0 của nó lại là một danh sách list có tính khả biến. Lệnh .extend() thay đổi dữ liệu bên trong list đó mà không thay đổi địa chỉ tham chiếu vùng nhớ mảng đầu của tuple, cuộc gọi thành công."
  },
  {
    id: 6033,
    category: Category.PYTHON_BASICS,
    questionText: "Lát cắt bước nhảy sau đây sẽ lấy các phần tử nào từ danh sách?",
    codeSnippet: "a = list(range(10))\nprint(a[2:8:2])",
    options: [
      "A. [2, 4, 6]",
      "B. [2, 3, 4]",
      "C. [2, 5, 8]",
      "D. [2, 4, 6, 8]"
    ],
    correctAnswerIndex: 0,
    explanation: "Cắt lát a[start:stop:step] với start=2, stop=8 (chỉ quét đến chỉ mục sát trước là 7), step=2 lấy các phần tử tại vị trí 2, 4, 6 với giá trị lần lượt là 2, 4, 6."
  },
  {
    id: 6034,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức sắp xếp dưới đây thực hiện ra sao?",
    codeSnippet: "a = [\"bb\", \"a\", \"ccc\"]\nprint(sorted(a, key=lambda x: (len(x), x)))",
    options: [
      "A. ['a', 'bb', 'ccc']",
      "B. ['ccc', 'bb', 'a']",
      "C. TypeError",
      "D. ['bb', 'a', 'ccc']"
    ],
    correctAnswerIndex: 0,
    explanation: "Thuật toán sắp xếp so sánh bộ khóa dạng tuple: ưu tiên thứ nhất là độ dài chuỗi len(x), ưu tiên thứ hai khi trùng là trật tự bảng chữ cái x. Sắp xếp đúng: 'a' (dài 1), 'bb' (dài 2), 'ccc' (dài 3)."
  },
  {
    id: 6035,
    category: Category.PYTHON_BASICS,
    questionText: "Khi gọi hàm max() trên mảng trống kèm tham số mặc định, kết quả trả về là gì?",
    codeSnippet: "print(max([], default=99))",
    options: [
      "A. ValueError",
      "B. 99",
      "C. None",
      "D. 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Tìm giá trị cực đại trên danh sách trống rỗng thông thường sẽ gây ra lỗi ValueError. Khi truyền đối số 'default=99', Python sẽ dùng giá trị này làm phương án dự phòng an toàn."
  },
  {
    id: 6036,
    category: Category.PYTHON_BASICS,
    questionText: "Đánh giá chân trị logic của any() và all() trên một danh sách rỗng:",
    codeSnippet: "print(any([]), all([]))",
    options: [
      "A. False False",
      "B. False True",
      "C. True True",
      "D. True False"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm any() trả về False khi danh sách rỗng vì không có phần tử nào True. Hàm all() định nghĩa theo chân trị rỗng (Vacuous Truth) luôn trả về True khi không có phần tử nào đánh giá thành False."
  },
  {
    id: 6037,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy so sánh bằng giữa kiểu byte và kiểu chuỗi ký tự sau, kết quả là gì?",
    codeSnippet: "print(b\"abc\" == \"abc\")",
    options: [
      "A. True",
      "B. False",
      "C. TypeError",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python 3, Bytes (b'abc') và String ('abc') là hai lớp lưu trữ văn bản hoàn toàn khác nhau. Phép so sánh '==' giữa các kiểu dữ liệu khác loại này lập tức trả về False mà không ném lỗi."
  },
  {
    id: 6038,
    category: Category.PYTHON_BASICS,
    questionText: "Kiểm tra tính chất của hàm map() trả về:",
    codeSnippet: "m = map(lambda x: x*2, [1, 2])\nprint(isinstance(m, list))",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm map() trong Python 3 luôn trả về một đối tượng bộ lặp lười (lazy iterator) tiết kiệm tài nguyên mảng chứ không sinh danh sách list ngay lập tức."
  },
  {
    id: 6039,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau hoạt động như thế nào với số nguyên khổng lồ?",
    codeSnippet: "r = range(10**10)\nprint(type(r) is range)",
    options: [
      "A. True \n(Chạy tức thời)",
      "B. False \n(MemoryError)",
      "C. False",
      "D. TypeError"
    ],
    correctAnswerIndex: 0,
    explanation: "Lớp range hoạt động lười biếng (lazy evaluation), nó chỉ tính toán dữ liệu của số khi chạy vòng lặp thực tế nên không tiêu tốn RAM để tạo mảng số to, chạy siêu nhanh và kiểu chính xác của nó là 'range'."
  },
  {
    id: 6040,
    category: Category.PYTHON_BASICS,
    questionText: "Kiểu (type) của một Class trống được định nghĩa là:",
    codeSnippet: "class A:\n    pass\nprint(type(A))",
    options: [
      "A. <class 'type'>",
      "B. <class 'object'>",
      "C. <class 'A'>",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Mọi lớp lớp học trong Python đều là đối tượng thực tế của siêu lớp sinh lập metaclass cơ sở hệ thống mặc định gọi là 'type'."
  },
  {
    id: 6041,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình đa kế thừa sau đây trả về giá trị bao nhiêu? (Method Resolution Order)",
    codeSnippet: "class A:\n    def f(self):\n        return 1\nclass B(A):\n    pass\nclass C(A):\n    def f(self):\n        return 2\nclass D(B, C):\n    pass\nprint(D().f())",
    options: [
      "A. 1",
      "B. 2",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Trình tự phân giải của D dựa trên MRO (C3 Linearization) là D -> B -> C -> A. Vì C định nghĩa đè phương thức f() nên D sẽ tìm và chạy hàm f của C trước hết và trả về 2."
  },
  {
    id: 6042,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm khởi tạo siêu lớp được kích hoạt như thế nào sau đây?",
    codeSnippet: "class A:\n    def __init__(self, x):\n        self.x = x\nclass B(A):\n    def __init__(self, x):\n        super().__init__(x)\nb = B(5)\nprint(b.x)",
    options: [
      "A. 5",
      "B. 0",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm super().__init__(x) của lớp B triệu gọi thành công hàm dựng cha để thiết lập thuộc tính x = 5 vào đối tượng thực thể b."
  },
  {
    id: 6043,
    category: Category.PYTHON_BASICS,
    questionText: "Thay đổi thuộc tính trực tiếp trên instance của lớp hoạt động ra sao?",
    codeSnippet: "class A:\n    x = 1\na = A()\nb = A()\na.x = 2\nprint(a.x, b.x)",
    options: [
      "A. 2 2",
      "B. 2 1",
      "C. 1 1",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Gán a.x = 2 tạo ra một thuộc tính x ở tầm thực thể (instance attribute) riêng cho đối tượng a, che khuất thuộc tính lớp chung. b không có thuộc tính instance nên vẫn gọi thuộc tính lớp là 1."
  },
  {
    id: 6044,
    category: Category.PYTHON_BASICS,
    questionText: "Cơ chế bảo vệ Name Mangling hoạt động như thế nào với thuộc tính hai gạch dưới?",
    codeSnippet: "class A:\n    def __init__(self):\n        self.__x = 1\na = A()\ntry:\n    print(a._A__x)\nexcept AttributeError:\n    print(\"Error\")",
    options: [
      "A. 1",
      "B. Error",
      "C. None",
      "D. AttributeError"
    ],
    correctAnswerIndex: 0,
    explanation: "Bất kỳ thuộc tính nào bắt đầu bằng hai dấu gạch dưới mà không kết thúc bằng hai dấu gạch dưới (ví dụ: __x) sẽ bị Python tự đổi tên thành '_ClassName__x'. Người dùng vẫn có thể truy cập bằng tên mới đó."
  },
  {
    id: 6045,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức ma thuật nào can thiệp độ chân trị logic của lớp?",
    codeSnippet: "class A:\n    def __len__(self):\n        return 0\nprint(bool(A()))",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi kiểm tra kiểu logic bool(obj), Python ưu tiên tìm kiếm phương thức __bool__. Nếu vắng mặt, nó sẽ quay lui gọi __len__. Ở đây __len__ trả về độ dài bằng 0 (rỗng) nên được quy luận logic là False."
  },
  {
    id: 6046,
    category: Category.PYTHON_BASICS,
    questionText: "Phép so sánh loại đối tượng: isinstance vs so sánh type trực tiếp:",
    codeSnippet: "class A: pass\nclass B(A): pass\nb = B()\nprint(isinstance(b, A), type(b) is A)",
    options: [
      "A. True True",
      "B. True False",
      "C. False True",
      "D. False False"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm isinstance(obj, Class) trả về True vì b kế thừa lớp A. Còn type(b) trả về chính xác lớp khởi sinh thực tế duy nhất là B nên so sánh 'type(b) is A' trả về False."
  },
  {
    id: 6047,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức tĩnh @staticmethod hoạt động ra sao?",
    codeSnippet: "class A:\n    @staticmethod\n    def f(x):\n        return x * 2\nprint(A.f(5))",
    options: [
      "A. 10",
      "B. Error",
      "C. None",
      "D. 5"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức tĩnh được gán nhãn '@staticmethod' hoạt động như hàm độc lập không tự động nhận đối số self hay cls. Gọi trực tiếp từ Class thành công."
  },
  {
    id: 6048,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức lớp @classmethod hoạt động ra sao khi được gọi từ lớp con?",
    codeSnippet: "class A:\n    val = 1\n    @classmethod\n    def create(cls):\n        return cls.val\nclass B(A):\n    val = 2\nprint(B.create())",
    options: [
      "A. 1",
      "B. 2",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Decorator @classmethod truyền lớp gọi hiện tại (ở đây là lớp con B) vào làm đối số đầu tiên cho tham số cls. Vì thế, cls.val trỏ tới thuộc tính lớp B là 2."
  },
  {
    id: 6049,
    category: Category.PYTHON_BASICS,
    questionText: "Đặt thuộc tính chỉ đọc trang trí bằng @property mà cố gán giá trị mới thì xảy ra gì?",
    codeSnippet: "class A:\n    @property\n    def x(self):\n        return 1\na = A()\ntry:\n    a.x = 2\nexcept AttributeError:\n    print(\"Error\")",
    options: [
      "A. Gán thành công 2",
      "B. Error",
      "C. Bỏ qua im lặng",
      "D. Dừng tiến trình"
    ],
    correctAnswerIndex: 1,
    explanation: "Thuộc tính trang trí bởi decorator '@property' mà thiếu chỉ định setter tương ứng sẽ ở trạng thái chỉ đọc. Cố tình thiết lập giá trị mới sẽ kích hoạt ngoại lệ AttributeError."
  },
  {
    id: 6050,
    category: Category.PYTHON_BASICS,
    questionText: "Khai báo __slots__ giới hạn gán thuộc tính động như thế nào?",
    codeSnippet: "class A:\n    __slots__ = ['a']\na = A()\ntry:\n    a.b = 2\nexcept AttributeError:\n    print(\"Error\")",
    options: [
      "A. Gán thành công b",
      "B. Error",
      "C. Không thay đổi gì",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Thuộc tính '__slots__' tắt đi việc tự động sinh tủ chứa từ điển '__dict__' chung để bảo vệ dung lượng bộ nhớ. Class lúc này chỉ chấp thuận ghi thuộc tính nằm trong dạnh sách khai báo trước (ở đây chỉ có 'a', cố gán 'b' lỗi AttributeError)."
  },
  {
    id: 6051,
    category: Category.PYTHON_BASICS,
    questionText: "Mối quan hệ giữa tạo đối tượng mới __new__ và khởi tạo thuộc tính __init__:",
    codeSnippet: "class A:\n    def __new__(cls):\n        return 1\n    def __init__(self):\n        print(\"Init\")\nprint(A())",
    options: [
      "A. Init 1",
      "B. 1",
      "C. Init None",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức __new__ trực tiếp chịu trách nhiệm sinh đẻ và trả về thực thể. Nếu __new__ trả về một đối tượng không phải thực thể của chính lớp đó (trả về số nguyên 1), Python bỏ qua không gọi hàm hủy __init__."
  },
  {
    id: 6052,
    category: Category.PYTHON_BASICS,
    questionText: "So sánh tính chất của kiểu số nguyên int với siêu mẫu loại type:",
    codeSnippet: "print(type(int) is type)",
    options: [
      "A. False",
      "B. True",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Khai sinh cấu trúc hệ thống Python quy định mọi kiểu dữ liệu xây dựng sẵn (int, str, list...) đều là class thực thể được đẻ ra từ gốc rễ lớp 'type', phép so sánh trả về True."
  },
  {
    id: 6053,
    category: Category.PYTHON_BASICS,
    questionText: "Đưa một tuple chứa một list khả biến làm khóa từ điển thì nhận lấy lỗi gì?",
    codeSnippet: "t = (1, [2])\ntry:\n    d = {t: 1}\nexcept Exception as e:\n    print(type(e).__name__)",
    options: [
      "A. Không có lỗi",
      "B. TypeError",
      "C. ValueError",
      "D. AttributeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Khóa của từ điển bắt buộc phải có khả năng băm được (hashable - bất biến). Tuple bất biến nhưng chứa phần tử con là list [2] khả biến nên cả tuple bị coi là unhashable, gây ra lỗi TypeError."
  },
  {
    id: 6054,
    category: Category.PYTHON_BASICS,
    questionText: "Cài đặt can thiệp so sánh bằng __eq__ trả về True trong mọi trường hợp:",
    codeSnippet: "class A:\n    def __eq__(self, other):\n        return True\nprint(A() == 1)",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép toán '==' kích hoạt thực phẩm magic __eq__. Do hàm được định sẵn để luôn trả về True nên phép so sánh thản nhiên cho kết quả Đúng."
  },
  {
    id: 6055,
    category: Category.PYTHON_BASICS,
    questionText: "Khởi tạo magic method cho phép gọi trực tiếp thực thể của lớp như một hàm:",
    codeSnippet: "class A:\n    def __call__(self):\n        return 1\nprint(A()())",
    options: [
      "A. 1",
      "B. Error",
      "C. Đối tượng A",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Magic method __call__ khi được thiết lập thành công định nghĩa thực thể hành xử tương thích như hàm bình thường. Chạy A()() trả về 1."
  },
  {
    id: 6056,
    category: Category.PYTHON_BASICS,
    questionText: "Trình tự phân giải kim cương đa cấp của MRO sau đây ra sao?",
    codeSnippet: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nprint([cls.__name__ for cls in D.mro()[:4]])",
    options: [
      "A. ['D', 'B', 'A', 'C']",
      "B. ['D', 'B', 'C', 'A']",
      "C. ['D', 'A', 'B', 'C']",
      "D. ['B', 'C', 'A', 'D']"
    ],
    correctAnswerIndex: 1,
    explanation: "Mô hình kim cương kế thừa đa tầng áp dụng giải thuật C3 Linearization quy định duyệt tất cả các nhánh con trực diện (B, C) rồi mới leo tới tổ tiên chung cao nhất (A). Thứ tự chính xác: D -> B -> C -> A."
  },
  {
    id: 6057,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau kích hoạt hàm hủy của lớp khi dọn dẹp biến:",
    codeSnippet: "class A:\n    def __del__(self):\n        print(\"Bye\")\na = A()\ndel a",
    options: [
      "A. Bye",
      "B. Không in gì",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm __del__ tự động triệu gọi khi bộ đếm tham chiếu (Reference count) của đối tượng hạ về mức 0. Lệnh 'del a' vứt bỏ tham chiếu tham chiếu độc lập khiến đối tượng bị thu gom bộ nhớ và in ra 'Bye'."
  },
  {
    id: 6058,
    category: Category.PYTHON_BASICS,
    questionText: "Khởi tạo trực tiếp một lớp trừu tượng có phương thức abstract gây lỗi gì?",
    codeSnippet: "from abc import ABC, abstractmethod\nclass A(ABC):\n    @abstractmethod\n    def f(self):\n        pass\ntry:\n    a = A()\nexcept Exception as e:\n    print(type(e).__name__)",
    options: [
      "A. Tạo A thành công",
      "B. TypeError",
      "C. ValueError",
      "D. AttributeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Lớp thiết lập kế thừa ABC và chứa hàm ghi đè '@abstractmethod' được quy định là lớp trừu tượng, Python từ chối khởi tạo thực thể trực tiếp và gây lỗi TypeError."
  },
  {
    id: 6059,
    category: Category.PYTHON_BASICS,
    questionText: "Gán biến lớp trực tiếp lên lớp con có thay đổi giá trị thuộc tính lớp cha?",
    codeSnippet: "class A:\n    x = 1\nclass B(A):\n    pass\nB.x = 2\nprint(A.x, B.x)",
    options: [
      "A. 2 2",
      "B. 1 2",
      "C. 1 1",
      "D. 2 1"
    ],
    correctAnswerIndex: 1,
    explanation: "Lệnh 'B.x = 2' thêu dệt và đính thuộc tính x = 2 riêng vào tầm lớp B (namespace của B), hoàn toàn độc lập không can thiệp dính líu thay đổi của lớp cha gốc A.x."
  },
  {
    id: 6060,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm dựng của lớp con không tự động triệu gọi hàm dựng cha:",
    codeSnippet: "class A:\n    def __init__(self):\n        print(\"A\")\nclass B(A):\n    def __init__(self):\n        print(\"B\")\nB()",
    options: [
      "A. B A",
      "B. B",
      "C. A B",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong thiết kế của Python, nếu ghi đè hàm dựng __init__ ở lớp con B mà quên viết triệu gọi rõ ràng dạng 'super().__init__()', Python sẽ chỉ chạy hàm dựng tại B thôi."
  },
  {
    id: 6061,
    category: Category.PYTHON_BASICS,
    questionText: "Độ phức tạp thời gian (Time Complexity) của đoạn chương trình lặp kép toán học sau là gì?",
    codeSnippet: "for i in range(1, n):\n    j = i\n    while j < n:\n        j *= 2",
    options: [
      "A. O(n^2)",
      "B. O(n log n)",
      "C. O(n)",
      "D. O(log n)"
    ],
    correctAnswerIndex: 2,
    explanation: "Xấp xỉ tổng số bước bên trong từ i=1 đến n của log(n/i) là O(n) sử dụng xấp xỉ liên tục Stirling trong giải tích toán học khoa học máy tính."
  },
  {
    id: 6062,
    category: Category.PYTHON_BASICS,
    questionText: "Độ phức tạp thời gian khi thực thi thuật toán đệ quy phân đôi cơ bản sau đây là gì?",
    codeSnippet: "def f(n):\n    if n <= 1:\n        return 1\n    return f(n - 1) + f(n - 1)",
    options: [
      "A. O(n)",
      "B. O(2^n)",
      "C. O(n^2)",
      "D. O(n log n)"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm đệ quy gọi lại nó hai lần trong mỗi tầng: T(n) = 2T(n - 1) + O(1). Sinh ra một cây đệ quy nhị phân hoàn toàn có độ sâu n, số lượng đỉnh của cây là 2^n - 1, dẫn đến O(2^n)."
  },
  {
    id: 6063,
    category: Category.PYTHON_BASICS,
    questionText: "Cấu trúc dữ liệu nào trong Python hỗ trợ tìm kiếm phần tử với chi phí trung bình nhanh nhất ở mức O(1)?",
    options: [
      "A. List",
      "B. Dictionary (Bảng băm)",
      "C. Tuple",
      "D. Sorted List"
    ],
    correctAnswerIndex: 1,
    explanation: "Dictionary được thiết kế dựa trên cấu trúc bảng băm (Hash Table), mang lại tốc độ truy vấn khóa tại chi phí trung bình lý tưởng là O(1)."
  },
  {
    id: 6064,
    category: Category.PYTHON_BASICS,
    questionText: "Thuật toán sắp xếp nào dưới đây có tính chất ổn định (Stable Sort)?",
    options: [
      "A. Quick Sort",
      "B. Merge Sort",
      "C. Heap Sort",
      "D. Selection Sort"
    ],
    correctAnswerIndex: 1,
    explanation: "Merge Sort bảo toàn vị trí nguyên vẹn tương đối của các phần tử có giá trị bằng nhau sau khi sắp xếp, do đó có tính chất ổn định (Stable)."
  },
  {
    id: 6065,
    category: Category.PYTHON_BASICS,
    questionText: "Hiện tượng Stack Overflow (Tràn bộ nhớ ngăn xếp đệ quy) xảy ra do chương trình thiếu yếu tố cốt lõi nào?",
    options: [
      "A. Bộ nhớ RAM",
      "B. Điều kiện dừng (Base case)",
      "C. Tốc độ CPU",
      "D. Dung lượng ổ cứng"
    ],
    correctAnswerIndex: 1,
    explanation: "Thiếu điều kiện dừng hoặc điều kiện dừng không bao giờ nhảy tới làm đệ quy gọi vô hạn chu kỳ gây lấp đầy hộp ngăn kéo Call Stack và vỡ tràn RAM ảo của Python (gây lỗi RecursionError)."
  },
  {
    id: 6066,
    category: Category.PYTHON_BASICS,
    questionText: "Lợi ích ưu việt hàng đầu của việc áp dụng giải thuật đệ quy trong thiết kế cấu trúc chương trình là gì?",
    options: [
      "A. Tốc độ chạy nhanh nhất",
      "B. Code mạch lạc, tự nhiên khi làm việc với phân cấp dạng cây (Tree) hoặc đồ thị (Graph)",
      "C. Tiết kiệm dung lượng RAM",
      "D. Hoàn toàn không bao giờ lỗi"
    ],
    correctAnswerIndex: 1,
    explanation: "Đệ quy giúp viết mã cực kỳ gọn sạch, khớp mẫu lý thuyết tự nhiên để giải bài toán phân cấp như duyệt cấu trúc dạng cây hoặc tìm kiếm đồ thị."
  },
  {
    id: 6067,
    category: Category.PYTHON_BASICS,
    questionText: "Với bài toán Tháp Hà Nội huyền thoại có 3 cọc và 3 chiếc đĩa, số bước dời đĩa tối thiểu là bao nhiêu?",
    options: [
      "A. 9 bước",
      "B. 7 bước",
      "C. 5 bước",
      "D. 8 bước"
    ],
    correctAnswerIndex: 1,
    explanation: "Công thức toán học giải bài toán số lần chuyển đĩa tối thiểu là 2^n - 1. Với n = 3 đĩa, số bước tối thiểu = 2^3 - 1 = 7 bước."
  },
  {
    id: 6068,
    category: Category.PYTHON_BASICS,
    questionText: "Khi chạy tìm kiếm nhị phân kiểm tra giá trị 8 trên danh sách [1, 3, 5, 7, 9], các phần tử thực tế được lấy ra so sánh lần lượt là:",
    options: [
      "A. 5, 7, 9",
      "B. 3, 5, 7",
      "C. 1, 3, 5",
      "D. 9, 7, 5"
    ],
    correctAnswerIndex: 0,
    explanation: "Các bước so sánh: 1) Chọn giữa mid là chỉ mục 2 (trị = 5). Vì 8 > 5 nên quét nửa phải. 2) Chọn mốc mid là chỉ mục 3 (trị = 7). Vì 8 > 7 nên quét tiếp nửa phải. 3) Đoạn còn lại mid chỉ mục 4 (trị = 9). Vì 8 < 9 nên tìm kiếm ngưng. Các trị so sánh là 5, 7, 9."
  },
  {
    id: 6069,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm sắp xếp list.sort() mặc định tích hợp sẵn trong ngôn ngữ Python đang sử dụng thuật toán tối ưu nào dưới đây?",
    options: [
      "A. Quick Sort",
      "B. Timsort",
      "C. Merge Sort",
      "D. Bubble Sort"
    ],
    correctAnswerIndex: 1,
    explanation: "Timsort (sự kết hợp xuất sắc giữa giải thuật sắp xếp chèn Insertion và sắp xếp trộn Merge) là thuật toán sắp xếp chuẩn của Python, chạy hiệu quả với cấu trúc dữ liệu thế giới thực."
  },
  {
    id: 6070,
    category: Category.PYTHON_BASICS,
    questionText: "So sánh độ phức tạp của hoạt động kiểm tra sự tồn tại phần tử 'x in list' và 'x in set' có kích thước danh sách n:",
    options: [
      "A. Đều bằng O(1)",
      "B. List tốn O(n); Set tốn O(1)",
      "C. List tốn O(1); Set tốn O(n)",
      "D. List tốn O(log n); Set tốn O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Do list phải duyệt tuần tự từ đầu mảng đến cuối nên tốn O(n). Set sử dụng bảng băm nên có thể tra cứu tức thời trong O(1)."
  },
  {
    id: 6071,
    category: Category.PYTHON_BASICS,
    questionText: "Trong trường hợp nào ta nên cân nhắc ưu tiên sử dụng đối tượng Generator hơn là cấu trúc List thông thường?",
    options: [
      "A. Khi cần truy xuất ngẫu nhiên nhanh bằng chỉ mục",
      "B. Làm việc với tập dữ liệu cực kỳ khổng lồ hoặc vô hạn nhằm tiết kiệm RAM tối đa (lazy evaluation)",
      "C. Khi cần thực hiện các thuật toán sắp xếp phức tạp",
      "D. Tập dữ liệu nhỏ và cần duyệt qua duyệt lại nhiều lần"
    ],
    correctAnswerIndex: 1,
    explanation: "Generator sản sinh kết quả 'on-demand' (lười bếng) tại từng bước lặp, không lưu trữ toàn bộ dữ liệu mẫu khổng lồ vào RAM nên tiết kiệm tài nguyên hệ thống rất lớn."
  },
  {
    id: 6072,
    category: Category.PYTHON_BASICS,
    questionText: "Độ phức tạp tính toán thời gian của câu lệnh đo chiều dài danh sách/tập hợp 'len(s)' trong Python là:",
    options: [
      "A. O(n)",
      "B. O(1)",
      "C. O(log n)",
      "D. O(n^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Python lưu trữ sẵn dung lượng số đếm phần tử của đối tượng mảng như một trường thuộc tính cố định trong bộ nhớ C-struct, khi gọi len() chỉ tốn O(1) để đọc ra cấu trúc trường đó."
  },
  {
    id: 6073,
    category: Category.PYTHON_BASICS,
    questionText: "Triển khai cấu trúc dữ liệu hàng đợi (Queue) bằng cấu trúc thường list vật lý kèm câu lệnh 'pop(0)' có chi phí thời gian là:",
    options: [
      "A. O(1)",
      "B. O(n)",
      "C. O(log n)",
      "D. Không ước lượng được"
    ],
    correctAnswerIndex: 1,
    explanation: "Sử dụng lệnh 'pop(0)' gỡ đi phần tử đầu tiên buộc Python dịch dồn toàn bộ n-1 phần tử còn lại lên phía trước 1 bước vị trí ô nhớ, quá trình lặp này tốn kém O(n)."
  },
  {
    id: 6074,
    category: Category.PYTHON_BASICS,
    questionText: "Trong thư viện chuẩn của Python, cấu trúc nào tối ưu cho các thao tác chèn/xóa tại hai đầu danh sách với giá trị O(1)?",
    options: [
      "A. list",
      "B. collections.deque",
      "C. set",
      "D. tuple"
    ],
    correctAnswerIndex: 1,
    explanation: "Đối tượng 'collections.deque' (Double-Ended Queue) triển khai dựa trên danh sách liên kết kép, mang lại hiệu ứng truy cập chèn xóa cực kỳ ưu tú O(1) ở cả hai biên."
  },
  {
    id: 6075,
    category: Category.PYTHON_BASICS,
    questionText: "Thuật toán tham lam kinh điển Dijkstra sinh ra với mục tiêu giải quyết bài toán cốt lõi nào?",
    options: [
      "A. Sắp xếp chuỗi chữ",
      "B. Tìm đường đi ngắn nhất từ một nguồn trên đồ thị trọng số không âm",
      "C. Tìm kiếm chuỗi con",
      "D. Mã hóa bảo mật dữ liệu"
    ],
    correctAnswerIndex: 1,
    explanation: "Dijkstra là thuật toán lừng danh sử dụng cơ chế tham lam để dò tìm đường đi ngắn nhất từ một ga đỉnh khởi điểm tới mọi đỉnh còn lại trên đồ thị trọng số không âm."
  },
  {
    id: 6076,
    category: Category.PYTHON_BASICS,
    questionText: "Trong tình huống tồi tệ nhất (Cây bị lệch hoàn toàn về 1 phía), chi phí tìm kiếm trên cây nhị phân BST biến thiên ở mức nào?",
    options: [
      "A. O(log n)",
      "B. O(n)",
      "C. O(1)",
      "D. O(n log n)"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi cây nhị phân sụp lệch hoàn toàn về một biên, kết cấu của nó thoái hóa thẳng về cấu trúc danh sách liên kết đơn tuần tự, chi phí duyệt tìm tăng vọt O(n)."
  },
  {
    id: 6077,
    category: Category.PYTHON_BASICS,
    questionText: "Cấu trúc từ điển trong ngôn ngữ Python xử lý tình huống va chạm bảng băm (Hash Collision) theo phương án nào?",
    options: [
      "A. Liên kết dây chuyền (Chaining)",
      "B. Dò địa chỉ mở (Open Addressing / Quadratic Probing)",
      "C. Không cho phép trùng lắp",
      "D. Gây gián đoạn tiến trình (Crash)"
    ],
    correctAnswerIndex: 1,
    explanation: "Để giữ cấu trúc bộ nhớ gọn gàng và duyệt tìm trên mảng dữ liệu liền mạch tốc độ cao, từ điển Python sử dụng phương pháp Dò địa chỉ mở (Open Addressing)."
  },
  {
    id: 6078,
    category: Category.PYTHON_BASICS,
    questionText: "Áp dụng phương án Quy hoạch động (Dynamic Programming - Bottom Up) để tính số Fibonacci thứ n có độ phức tạp là:",
    options: [
      "A. O(n)",
      "B. O(2^n)",
      "C. O(1)",
      "D. O(n^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Quy hoạch động tiến hành giải và ghi nhớ lời giải bài toán con kế tiếp theo thứ tự từ dưới lên, triệt tiêu việc rẽ nhánh trùng lặp, ép chi phí thời gian từ số mũ O(2^n) về O(n)."
  },
  {
    id: 6079,
    category: Category.PYTHON_BASICS,
    questionText: "Thuật toán phân cụm K-Means nổi tiếng thuộc phân nhánh kỹ thuật học máy nào?",
    options: [
      "A. Học máy có giám sát (Supervised Learning)",
      "B. Học máy không giám sát (Unsupervised Learning)",
      "C. Học máy tăng cường (Reinforcement Learning)",
      "D. Học sâu (Deep Learning)"
    ],
    correctAnswerIndex: 1,
    explanation: "K-Means dò tìm phân chia mảng dữ liệu vào các nhóm đặc trưng dựa vào tính chất trực diện khoảng cách hình học, không cần dữ liệu có nhãn hướng đạo trước (Unsupervised)."
  },
  {
    id: 6080,
    category: Category.PYTHON_BASICS,
    questionText: "Độ phức tạp thời gian tính toán của 3 vòng cấu trúc lặp lồng chặt chẽ sau là bao nhiêu?",
    codeSnippet: "for i in range(n):\n    for j in range(n):\n        for k in range(n):\n            ans += 1",
    options: [
      "A. O(n)",
      "B. O(n^2)",
      "C. O(n^3)",
      "D. O(log n)"
    ],
    correctAnswerIndex: 2,
    explanation: "Mỗi vòng lặp chạy n lần lồng tuần tự 3 tầng mốc, tổng khối lượng số bước lặp là n * n * n = n^3 bước -> O(n^3)."
  },
  {
    id: 6081,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy phép thẩm tra đồng nhất đối tượng trên thanh nhớ sau:",
    codeSnippet: "a = 256\nb = 256\nc = 300\nd = 300\nprint(a is b, c is d)",
    options: [
      "A. True False",
      "B. True True",
      "C. False False",
      "D. False True"
    ],
    correctAnswerIndex: 0,
    explanation: "Số 256 nằm trong vùng nhớ đệm bảo tồn sẵn [-5, 256] nên a và b đi chung một lối trỏ trỏ RAM. Trị 300 nằm ngoài vùng đệm làm c và d được giữ tại hai mốc nhớ rời rạc -> c is d nhận False."
  },
  {
    id: 6082,
    category: Category.PYTHON_BASICS,
    questionText: "Khi nào đối số mặc định của hàm được tính toán đánh giá giá trị?",
    codeSnippet: "import time\ndef f(x=time.time()):\n    print(x)\nf()\ntime.sleep(1)\nf()",
    options: [
      "A. Kết quả hai lượt in khác nhau",
      "B. Kết quả hai lượt in giống nhau hoàn toàn",
      "C. Phát sinh lỗi chạy runtime",
      "D. Không hiển thị kết quả"
    ],
    correctAnswerIndex: 1,
    explanation: "Giá trị gán mặc định cho tham số 'time.time()' chỉ được tính toán duy nhất một lần khi Python thông dịch mã nguồn dựng nên định nghĩa hàm. Vì thế gọi f() tiếp theo sử dụng lại giá trị cũ."
  },
  {
    id: 6083,
    category: Category.PYTHON_BASICS,
    questionText: "Tầm vực biến lớp và phương thức thực thể phối hợp ra sao khi tìm biến?",
    codeSnippet: "x = 1\nclass A:\n    x = 2\n    y = x\n    def f(self):\n        return x\nprint(A.y, A().f())",
    options: [
      "A. 2 2",
      "B. 2 1",
      "C. 1 1",
      "D. 1 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Thuộc tính lớp y = x tìm được x = 2 của lớp A. Tuy nhiên tầm vực lớp A không lồng vào tầm vực của phương thức f(). Khi f() gọi 'x', hệ thống tìm x tại phạm vi hàm (không có) rồi bỏ qua lớp nhảy thẳng ra ngoài tìm thấy biến toàn cục 'x = 1'."
  },
  {
    id: 6084,
    category: Category.PYTHON_BASICS,
    questionText: "Biến đại diện ngoại lệ của ngoại lệ có rò rỉ ra ngoài khối except bảo vệ?",
    codeSnippet: "try:\n    1 / 0\nexcept ZeroDivisionError as e:\n    pass\nprint('e' in locals())",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Mỗi khi rời khỏi khối bảo vệ 'except', Python dọn sạch biến hứng tham chiếu e tự động để tránh dính líu dập dờn vòng lặp ô nhớ rác (Reference cycles)."
  },
  {
    id: 6085,
    category: Category.PYTHON_BASICS,
    questionText: "Biến chạy vòng lặp 'for i' có bị mất đi khi vòng lặp kết thúc?",
    codeSnippet: "for i in range(3):\n    pass\nprint(i)",
    options: [
      "A. NameError",
      "B. 2",
      "C. 3",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Vòng lặp trong Python không tự thiết kế bức tường tầm vực mới. Biến chạy i thản nhiên rò rỉ và tồn tại trong không gian chứa vòng lặp đó, lưu giá trị duyệt thành công cuối cùng là 2."
  },
  {
    id: 6086,
    category: Category.PYTHON_BASICS,
    questionText: "Biến chạy của biểu thức rút gọn List Comprehension có bị rò rỉ?",
    codeSnippet: "x = 1\n[x for x in range(3)]\nprint(x)",
    options: [
      "A. 1",
      "B. 2",
      "C. 3",
      "D. 0"
    ],
    correctAnswerIndex: 0,
    explanation: "Trong phiên bản Python 3+, giải thuật dựng List Comprehension hoạt động trong không gian tên cô lập riêng nên không làm rò rỉ hay dập xóa dấu ấn của biến x ngoài."
  },
  {
    id: 6087,
    category: Category.PYTHON_BASICS,
    questionText: "Đánh giá chân trị logic của giá trị đặc biệt float('nan') trong Python:",
    codeSnippet: "print(bool(float('nan')))",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. ValueError"
    ],
    correctAnswerIndex: 0,
    explanation: "Giá trị Not (NaN - float('nan')) là một thực thể số thực hợp lệ, khác rỗng và không mang giá trị số 0, do đó chân trị logic luôn là True."
  },
  {
    id: 6088,
    category: Category.PYTHON_BASICS,
    questionText: "So sánh giá trị vô hạn cộng thêm 1 với vô hạn thu về kết quả:",
    codeSnippet: "print(float('inf') + 1 == float('inf'))",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. OverFlowError"
    ],
    correctAnswerIndex: 0,
    explanation: "Chiếu theo đặc tả số thực chuẩn IEEE 754, giá trị vô hạn (inf) cộng hoặc trừ với mốc số thực hữu hạn bất kỳ vẫn bằng chính vô cực."
  },
  {
    id: 6089,
    category: Category.PYTHON_BASICS,
    questionText: "Cố tình chèn thêm khóa vào từ điển khi đang lặp trực tiếp qua nó gây ra lỗi gì?",
    codeSnippet: "d = {1: 1, 2: 2}\ntry:\n    for k in d:\n        d[k * 2] = k\nexcept RuntimeError:\n    print('Error')",
    options: [
      "A. Error",
      "B. Chạy bình thường",
      "C. Lặp vô tận",
      "D. Dừng tiến trình đột ngột"
    ],
    correctAnswerIndex: 0,
    explanation: "Python cấm kỵ tuyệt đối việc thay đổi kích thước sửa đổi (chèn/xóa khóa) trực tiếp của từ điển trong tiến trình lặp qua các key của nó và quăng lỗi RuntimeError."
  },
  {
    id: 6090,
    category: Category.PYTHON_BASICS,
    questionText: "Hai đối tượng tuple độc lập có cùng các giá trị phần tử liệu có mã băm bằng nhau?",
    codeSnippet: "x = (1, 2)\ny = (1, 2)\nprint(hash(x) == hash(y))",
    options: [
      "A. True",
      "B. False",
      "C. Tùy thời điểm chạy",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Nguyên tắc thiết kế cấu trúc bảng băm: Hai thực thể bằng nhau (x == y) bắt buộc phải sinh ra cùng một mã băm hash giống hệt nhau để phục vụ tra cứu chính xác."
  },
  {
    id: 6091,
    category: Category.PYTHON_BASICS,
    questionText: "Phép so sánh 'is' trên hai chuỗi nhân bản dài sau trả về kết quả:",
    codeSnippet: "a = 'a' * 20\nb = 'a' * 20\nprint(a is b)",
    options: [
      "A. True",
      "B. False",
      "C. Tùy trình thông dịch",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Python sử dụng thuật toán gộp chuỗi (String Interning) tự động gộp các chuỗi ký tự không chứa khoảng trắng đặc biệt có độ dài ngắn về chung một địa chỉ ô nhớ RAM để tiết kiệm không gian."
  },
  {
    id: 6092,
    category: Category.PYTHON_BASICS,
    questionText: "Gán biến tiện ích bằng toán tử Walrus ':=' trong biểu thức so sánh:",
    codeSnippet: "if (n := len([1, 2])) > 1:\n    print(n)",
    options: [
      "A. SyntaxError",
      "B. 2",
      "C. 1",
      "D. True"
    ],
    correctAnswerIndex: 1,
    explanation: "Toán tử Walrus ':=' tiến hành gán trực tiếp giá trị 2 vào biến n đồng thời trả về giá trị n này làm nguyên liệu chạy phép so sánh lớn hơn 1 ngay lập tức."
  },
  {
    id: 6093,
    category: Category.PYTHON_BASICS,
    questionText: "Sử dụng cú pháp '=' đặc biệt trong chuỗi F-string giúp in ra gì?",
    codeSnippet: "x = 10\nprint(f\"{x=}\")",
    options: [
      "A. 10",
      "B. x=10",
      "C. x",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Cú pháp f'{var=}' (xuất hiện từ Python 3.8) tự động định dạng xuất ra văn bản gồm tên biến, dấu bằng và giá trị biến, hỗ trợ đắc lực và gọn nhẹ cho việc gỡ lỗi nhanh."
  },
  {
    id: 6094,
    category: Category.PYTHON_BASICS,
    questionText: "Khi tệp mã nguồn Python được chạy trực tiếp làm điểm mồi của chương trình, biến đặc biệt __name__ chứa giá trị nào?",
    options: [
      "A. Tên tệp hiện tại",
      "B. '__main__'",
      "C. None",
      "D. 'script'"
    ],
    correctAnswerIndex: 1,
    explanation: "Mặc định Python tự động thiết lập gán chuỗi '__main__' vào thuộc tính __name__ của tệp mã nguồn đóng vai trò điểm mồi kích hoạt chương trình chính."
  },
  {
    id: 6095,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau, giá trị in ra màn hình là bao nhiêu? (zip_longest logic)",
    codeSnippet: "from itertools import zip_longest\nprint(list(zip_longest([1, 2], [3], fillvalue=0)))",
    options: [
      "A. [(1, 3)]",
      "B. [(1, 3), (2, None)]",
      "C. Error",
      "D. [(1, 3), (2, 0)]"
    ],
    correctAnswerIndex: 3,
    explanation: "Hàm zip_longest ghép cặp theo chuỗi có độ dài lớn nhất. Danh sách ngắn hơn ([3]) sẽ được lấp đầy khoảng thiếu bằng giá trị do tham số 'fillvalue=0' chỉ định. Kết quả: [(1, 3), (2, 0)]."
  },
  {
    id: 6096,
    category: Category.PYTHON_BASICS,
    questionText: "Cài đặt magic method nào giúp thực thể lớp hỗ trợ truy xuất chỉ mục ngoặc vuông dạng obj[index]?",
    options: [
      "A. __call__",
      "B. __getitem__",
      "C. __index__",
      "D. __str__"
    ],
    correctAnswerIndex: 1,
    explanation: "Magic method __getitem__ cho phép định nghĩa các hành vi đọc phần tử bằng ngoặc vuông (Subscriptable) cho thực thể của lớp giống như list hay dict."
  },
  {
    id: 6097,
    category: Category.PYTHON_BASICS,
    questionText: "Một đối tượng tuân thủ giao thức lặp (Iterator Protocol) hoàn chỉnh bắt buộc phải cài đặt cặp magic method nào dưới đây?",
    options: [
      "A. __iter__ và __next__",
      "B. __init__ và __iter__",
      "C. __enter__ và __exit__",
      "D. __next__ và __len__"
    ],
    correctAnswerIndex: 0,
    explanation: "Theo chuẩn và đặc tả ngôn ngữ Python, một Iterator đầy đủ bắt buộc phải triển khai phương thức __iter__ (trả về chính nó) và __next__ (trả về phần tử kế tiếp)."
  },
  {
    id: 6098,
    category: Category.PYTHON_BASICS,
    questionText: "Khóa thông dịch toàn cục (GIL - Global Interpreter Lock) trong trình CPython hoạt động với mục đích cốt lõi gì?",
    options: [
      "A. Ngăn cản việc viết code đa nhiệm",
      "B. Đảm bảo chỉ có một luồng duy nhất được phép thực thi bytecode Python tại một thời điểm",
      "C. Tăng tốc tối đa cho các tác vụ đa luồng CPU-bound",
      "D. Giải phóng bộ nhớ nhanh hơn"
    ],
    correctAnswerIndex: 1,
    explanation: "GIL khóa cứng và chỉ cho phép duy nhất một native thread thực thi bytecode CPython tại một thời điểm để giữ bộ đếm tham chiếu an toàn, gây nghẽn hiệu năng đa luồng trên tác vụ nặng CPU."
  },
  {
    id: 6099,
    category: Category.PYTHON_BASICS,
    questionText: "Khi chạy lệnh 'import this' trong môi trường tương tác Python, màn hình sẽ hiển thị gì?",
    options: [
      "A. Lỗi ImportError",
      "B. Các triết lý thiết kế đặc trưng của Python (The Zen of Python)",
      "C. Các từ khóa được bảo lưu",
      "D. Thông tin đóng góp đóng bản quyền"
    ],
    correctAnswerIndex: 1,
    explanation: "'import this' là một Easter Egg thú vị của Python, in ra 19 triết lý vàng định hình phong cách viết mã sạch, tối giản và tự nhiên gọi là 'The Zen of Python'."
  },
  {
    id: 6100,
    category: Category.PYTHON_BASICS,
    questionText: "Chạy đoạn mã kiểm tra giá trị giới hạn đệ quy sau, kết quả hiển thị là:",
    codeSnippet: "import sys\nprint(sys.getrecursionlimit() > 100)",
    options: [
      "A. True",
      "B. False",
      "C. Error",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Theo thiết lập an toàn mặc định của CPython chống tràn ngăn xếp tàn phá hệ điều hành, mốc giới hạn đệ quy Call Stack được đặt là 1000 bước, giá trị này hiển nhiên lớn hơn 100."
  }
];
