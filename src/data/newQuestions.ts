import { Question, Category } from "../types";

export const new100QuizQuestions: Question[] = [
  // SECTION 1: Python Basics, Input/Output, conditions & functions
  {
    id: 5001,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (Kiến thức về List Slicing & Mutation)",
    codeSnippet: "a = [1, 2, 3, 4, 5]\na[1:4] = [10]\nprint(len(a))",
    options: [
      "A. 5",
      "B. 4",
      "C. 3",
      "D. Error"
    ],
    correctAnswerIndex: 2,
    explanation: "Slicing `a[1:4]` lấy các phần tử từ chỉ số 1 đến 3 (tức là 2, 3, 4) và thay thế toàn bộ bằng danh sách `[10]`. Mảng ban đầu `[1, 2, 3, 4, 5]` biến đổi thành `[1, 10, 5]` có độ dài bằng 3."
  },
  {
    id: 5002,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Short-circuit Evaluation)",
    codeSnippet: "a = 0\ndef check():\n    global a\n    a += 1\n    return True\n\nprint(False and check())\nprint(a)",
    options: [
      "A. False và 0",
      "B. False và 1",
      "C. True và 0",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép toán logic `and` áp dụng cơ chế Short-circuit Evaluation (đánh giá ngắn mạch). Do vế đầu là False, Python bỏ qua không thực hiện hàm `check()`. Nên `a` giữ nguyên giá trị bằng 0."
  },
  {
    id: 5003,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của đoạn mã dưới đây là gì? (Kiến thức về Local vs Global Scope)",
    codeSnippet: "count = 10\ndef increment():\n    count += 1\n    print(count)\n\nincrement()",
    options: [
      "A. 10",
      "B. 11",
      "C. UnboundLocalError",
      "D. None"
    ],
    correctAnswerIndex: 2,
    explanation: "Trong thân hàm `increment()`, việc gán `count += 1` biến `count` thành biến cục bộ (local variable). Do chưa được khai báo hay khởi tạo trong hàm trước khi đọc giá trị, Python phát sinh ngoại lệ `UnboundLocalError`."
  },
  {
    id: 5004,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã nguồn Python sau. Hãy cho biết kết quả khi thực thi: (Kiến thức về String Mutability)",
    codeSnippet: "s = \"Python\"\ns[0] = \"p\"\nprint(s)",
    options: [
      "A. python",
      "B. Python",
      "C. TypeError",
      "D. p"
    ],
    correctAnswerIndex: 2,
    explanation: "Chuỗi ký tự (String) trong Python là đối tượng bất biến (immutable). Hành vi gán thay đổi trực tiếp phần tử của chuỗi thông qua chỉ mục `s[0] = 'p'` sẽ ném ra lỗi `TypeError`."
  },
  {
    id: 5005,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Dictionary Comprehension)",
    codeSnippet: "x = {i: i**2 for i in range(3)}\nprint(x.get(2, -1))",
    options: [
      "A. 2",
      "B. 4",
      "C. 8",
      "D. -1"
    ],
    correctAnswerIndex: 1,
    explanation: "Dictionary comprehension sinh ra từ điển `x = {0: 0, 1: 1, 2: 4}`. Lệnh `x.get(2, -1)` trả về giá trị ứng với khóa 2 là 4."
  },
  {
    id: 5006,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Kiến thức về While-Else & Break Logic)",
    codeSnippet: "n = 5\nwhile n > 0:\n    n -= 1\n    if n == 2:\n        break\nelse:\n    print(\"Done\")\nprint(n)",
    options: [
      "A. Done và 2",
      "B. 2",
      "C. 0",
      "D. Done và 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Khi vòng lặp `while` kết thúc đột ngột do lệnh `break` khi `n == 2`, khối `else` của vòng lặp sẽ bị bỏ qua không chạy. Do đó, chương trình chỉ hiển thị giá trị của `n` là 2."
  },
  {
    id: 5007,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã nguồn sau đây là gì? (Kiến thức về Default Mutable Arguments)",
    codeSnippet: "def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))",
    options: [
      "A. [1] và [2]",
      "B. [1] và [1, 2]",
      "C. [1] và []",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python, giá trị mặc định của đối số có thể thay đổi (mutable default arguments) như danh sách rỗng `lst=[]` chỉ được khởi tạo một lần duy nhất khi định nghĩa hàm. Các lượt gọi tiếp theo sẽ dùng chung danh sách này, dẫn đến hiệu ứng tích lũy: [1] rồi đến [1, 2]."
  },
  {
    id: 5008,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết kết quả hiển thị khi chạy đoạn mã dưới đây: (Kiến thức về Chia lấy nguyên & dư với số âm)",
    codeSnippet: "print(-5 // 2)\nprint(-5 % 2)",
    options: [
      "A. -2 và -1",
      "B. -3 và 1",
      "C. -2 và 1",
      "D. -3 và -1"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép chia lấy nguyên `//` của Python làm tròn về phía âm vô cực, nên `-5 // 2` bằng `-3`. Phép modulo `%` được tính bằng công thức `a % b = a - (a // b) * b`, tức là `-5 - (-3) * 2 = 1`."
  },
  {
    id: 5009,
    category: Category.PYTHON_BASICS,
    questionText: "Trình thông dịch Python sẽ đưa ra kết quả gì khi chạy đoạn mã sau? (Kiến thức về Phép gán đa biến phức tạp)",
    codeSnippet: "a, b = 1, 2\na, b = b, a + b\nprint(a, b)",
    options: [
      "A. 2 3",
      "B. 2 4",
      "C. 1 3",
      "D. 2 2"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép gán đa biến đánh giá toàn bộ vế phải trước khi gán sang vế trái. `b = 2`, `a + b = 3`. Do đó `a` nhận giá trị 2, `b` nhận giá trị 3."
  },
  {
    id: 5010,
    category: Category.RECURSION_OOP,
    questionText: "Output của đoạn chương trình dưới đây là gì? (Kiến thức về Hàm đệ quy cơ bản)",
    codeSnippet: "def func(n):\n    if n == 1:\n        return 1\n    return n * func(n - 1)\n\nprint(func(4))",
    options: [
      "A. 24",
      "B. 12",
      "C. 6",
      "D. poolError"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm đệ quy tính giai thừa của n. Với n = 4, `func(4) = 4 * func(3) = 4 * 3 * func(2) = 4 * 3 * 2 * 1 = 24`."
  },
  {
    id: 5011,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của đoạn mã sau là gì? (Kiến thức về So sánh chuỗi & Mã ASCII)",
    codeSnippet: "print(\"apple\" > \"banana\")\nprint(\"Apple\" < \"apple\")",
    options: [
      "A. True và True",
      "B. False và True",
      "C. False và False",
      "D. True và False"
    ],
    correctAnswerIndex: 1,
    explanation: "So sánh chuỗi trong Python dựa trên thứ tự bảng mã ASCII của từng ký tự. Ký tự 'a' (97) lớn hơn 'A' (65). Do đó 'apple' > 'banana' trả về False (vì 'a' < 'b'), còn 'Apple' < 'apple' trả về True (vì 'A' < 'a')."
  },
  {
    id: 5012,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau in ra giá trị nào? (Kiến thức về Dictionary Keys)",
    codeSnippet: "d = {}\nd[1] = \"A\"\nd[1.0] = \"B\"\nprint(len(d))",
    options: [
      "A. 2",
      "B. 1",
      "C. 0",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Vì `1 == 1.0` evaluates True và chúng sinh ra cùng một mã băm (hash) như nhau, Python coi số nguyên `1` và số thực `1.0` chỉ là một khóa duy nhất trong Dictionary đè giá trị lên nhau. Do đó, độ dài của từ điển `len(d)` vẫn là 1."
  },
  {
    id: 5013,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn chương trình sau. Output của nó là gì? (Kiến thức về List sao chép đối tượng)",
    codeSnippet: "a = [1, 2, [3, 4]]\nb = list(a)\nb[2].append(5)\nprint(a)",
    options: [
      "A. [1, 2, [3, 4]]",
      "B. [1, 2, [3, 4, 5]]",
      "C. [1, 2, [3, 4], 5]",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Sử dụng hàm `list(a)` tạo bản sao nông (shallow copy). Các phần tử nông như số nguyên `1`, `2` được sao chép độc lập, nhưng tham chiếu danh sách con `[3, 4]` thì dùng chung. Do đó sự thay đổi ở `b[2]` lan truyền sang `a`."
  },
  {
    id: 5014,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả xuất ra của chương trình dưới đây là gì? (Kiến thức về Hàm nặc danh Lambda)",
    codeSnippet: "f = lambda x, y: x if x > y else y\nprint(f(10, 15))",
    options: [
      "A. 10",
      "B. 15",
      "C. True",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm nặc danh lambda nhận x và y, trả về x nếu x > y, ngược lại trả về y (tìm số lớn nhất). Gọi f(10, 15) trả về 15."
  },
  {
    id: 5015,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã sau là gì? (Kiến thức về Các toán tử so sánh chuỗi liên tiếp)",
    codeSnippet: "print(1 < 2 < 3)\nprint(3 > 2 > 4)",
    options: [
      "A. True và False",
      "B. True và True",
      "C. False và False",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép so sánh lồng `1 < 2 < 3` tương đương `(1 < 2) and (2 < 3)` -> True. Phép so sánh lồng `3 > 2 > 4` tương đương `(3 > 2) and (2 > 4)` -> False."
  },
  {
    id: 5016,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Kiến thức về Set và sự trùng lặp)",
    codeSnippet: "s = {1, 2, 2, 3, 3, 3}\nprint(len(s))",
    options: [
      "A. 6",
      "B. 3",
      "C. 2",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Tập hợp (Set) tự động loại trừ mọi phần tử trùng lặp, nên `s` chỉ còn `{1, 2, 3}`, có độ dài bằng 3."
  },
  {
    id: 5017,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau. Cho biết kết quả khi thực thi: (Kiến thức về Khai báo Tuple đơn phần tử)",
    codeSnippet: "t1 = (1)\nt2 = (1,)\nprint(type(t1) == type(t2))",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Khai báo `t1 = (1)` chỉ định kiểu là `int`. Khai báo `t2 = (1,)` có dấu phẩy mới xác nhận là kiểu `tuple`. Vì vậy kiểu dữ liệu của chúng khác nhau."
  },
  {
    id: 5018,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Hàm all() với tập rỗng)",
    codeSnippet: "print(all([]))\nprint(any([]))",
    options: [
      "A. True và False",
      "B. False và False",
      "C. True và True",
      "D. False và True"
    ],
    correctAnswerIndex: 0,
    explanation: "Với cấu trúc rỗng, hàm `all([])` mặc định trả về True (Vacuous truth), còn `any([])` trả về False vì không tìm thấy phần tử nào đánh giá đúng."
  },
  {
    id: 5019,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết kết quả sau khi thực thi đoạn mã sau: (Kiến thức về Chèn và phân mảnh List)",
    codeSnippet: "x = [1, 2, 3]\nx.extend([4, 5])\nprint(len(x))",
    options: [
      "A. 4",
      "B. 5",
      "C. 6",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `extend` phân rã tập hợp mới và thêm các phần tử đơn lẻ của nó vào cuối list ban đầu. Số phần tử tăng lên thành 5."
  },
  {
    id: 5020,
    category: Category.RECURSION_OOP,
    questionText: "Hàm sau đây dùng để thực hiện công việc gì? (Kiến thức về Đệ quy tính tổng)",
    codeSnippet: "def mystery(n):\n    if n <= 0:\n        return 0\n    return n + mystery(n - 2)\n\nprint(mystery(5))",
    options: [
      "A. 15",
      "B. 9",
      "C. 8",
      "D. 5"
    ],
    correctAnswerIndex: 1,
    explanation: "`mystery(5) = 5 + mystery(3) = 5 + 3 + 1 + 0 = 9`. Hàm đệ quy này thực hiện tính tổng các số lẻ từ 1 đến n."
  },
  {
    id: 5021,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết giá trị in ra màn hình của đoạn code sau: (Kiến thức về Độ ưu tiên toán tử)",
    codeSnippet: "print(2 ** 3 ** 2)",
    options: [
      "A. 64",
      "B. 512",
      "C. 65536",
      "D. 18"
    ],
    correctAnswerIndex: 1,
    explanation: "Toán tử lũy thừa `**` có đặc tính kết hợp từ phải qua trái (right-associative). Biểu thức tương đương với `2 ** (3 ** 2) = 2 ** 9 = 512`."
  },
  {
    id: 5022,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Ép kiểu Boolean)",
    codeSnippet: "print(bool(\"False\"))\nprint(bool(\"\"))",
    options: [
      "A. False và False",
      "B. True và False",
      "C. True và True",
      "D. False và True"
    ],
    correctAnswerIndex: 1,
    explanation: "Mọi chuỗi phi rỗng trong Python đều đánh giá trị boolean là `True` (kể cả chuỗi chữ 'False'). Chỉ chuỗi trống rỗng `\"\"` mới evaluates là `False`."
  },
  {
    id: 5023,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình dưới đây in ra giá trị gì? (Kiến thức về Phương thức join())",
    codeSnippet: "words = [\"Python\", \"is\", \"cool\"]\nprint(\"-\".join(words))",
    options: [
      "A. Pythoniscool",
      "B. Python-is-cool",
      "C. -Python-is-cool-",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `join()` của chuỗi nối kết toàn bộ phần tử trong danh sách thông qua chuỗi phân cách gọi phương thức. Kết quả thu được là 'Python-is-cool'."
  },
  {
    id: 5024,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả xuất ra màn hình của đoạn mã sau là gì? (Kiến thức về Toán tử ba ngôi lồng nhau)",
    codeSnippet: "x = 5\ny = 10\nres = \"A\" if x > y else \"B\" if x == 5 else \"C\"\nprint(res)",
    options: [
      "A. A",
      "B. B",
      "C. C",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Đánh giá toán tử ba ngôi lồng nhau: vế đầu `x > y` (5 > 10) là False, chuyển sang nhánh else: `\"B\" if x == 5 else \"C\"`. Vì `x == 5` đúng nên kết quả nhận được là 'B'."
  },
  {
    id: 5025,
    category: Category.PYTHON_BASICS,
    questionText: "Chương trình sau đây trả về giá trị nào khi kết thúc? (Kiến thức về Vòng lặp for lồng nhau nâng cao)",
    codeSnippet: "total = 0\nfor i in range(1, 4):\n    for j in range(i):\n        total += i\nprint(total)",
    options: [
      "A. 14",
      "B. 10",
      "C. 6",
      "D. 12"
    ],
    correctAnswerIndex: 0,
    explanation: "Trình tự lặp cộng tích lũy:\n- i = 1: cộng i (1) 1 lần -> total=1\n- i = 2: cộng i (2) 2 lần -> total = 1+4 = 5\n- i = 3: cộng i (3) 3 lần -> total = 5+9 = 14.\nTổng cộng dồn thu được bằng 14."
  },

  // SECTION 2: Vòng lặp, Xử lý chuỗi, List nâng cao và Đệ quy nâng cao (Q26 - Q50)
  {
    id: 5026,
    category: Category.PYTHON_BASICS,
    questionText: "Output của chương trình sau là gì? (Kiến thức về Tác động phụ của phép gán danh sách)",
    codeSnippet: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
    options: [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. AttributeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép gán `b = a` không tạo danh sách mới mà chỉ trỏ biến `b` tới cùng địa chỉ ô nhớ của `a`. Sự can thiệp thêm 4 vào `b` cũng làm độ dài của `a` là 4."
  },
  {
    id: 5027,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả khi chạy đoạn mã dưới đây là gì? (Kiến thức về remove giá trị trong List)",
    codeSnippet: "x = [1, 2, 3, 2, 1]\nx.remove(2)\nprint(x)",
    options: [
      "A. [1, 3, 2, 1]",
      "B. [1, 3, 1]",
      "C. [1, 2, 3, 1]",
      "D. ValueError"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `remove(val)` lược bỏ phần tử đầu tiên khớp với trị truyền vào (từ trái sang phải). Số 2 đầu xuất hiện ở chỉ mục 1 biến mất, giữ lại phần còn lại là `[1, 3, 2, 1]`."
  },
  {
    id: 5028,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code dưới đây là gì? (Kiến thức về Chỉ mục âm chuỗi)",
    codeSnippet: "s = \"Hello\"\nprint(s[-1::-1])",
    options: [
      "A. o",
      "B. olleH",
      "C. Hello",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Slicing `s[-1::-1]` bắt đầu từ chỉ số -1 (chữ 'o') và đi ngược về đầu chuỗi với bước nhảy -1, tạo ra chuỗi đảo ngược hoàn chỉnh: 'olleH'."
  },
  {
    id: 5029,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết giá trị hiển thị khi thực thi đoạn mã sau: (Kiến thức về pop() với chỉ mục)",
    codeSnippet: "a = [10, 20, 30, 40]\na.pop(1)\nprint(a)",
    options: [
      "A. [10, 30, 40]",
      "B. [20, 30, 40]",
      "C. [10, 20, 40]",
      "D. IndexError"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `.pop(1)` tách và gỡ bỏ phần tử ở vị trí chỉ mục 1 (là giá trị 20) rời khỏi list, phần còn lại còn `[10, 30, 40]`."
  },
  {
    id: 5030,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code sau là gì? (Kiến thức về Thay thế phân mảnh)",
    codeSnippet: "lst = [1, 2, 3]\nlst[1:1] = [100]\nprint(lst)",
    options: [
      "A. [1, 100, 3]",
      "B. [1, 100, 2, 3]",
      "C. [1, 2, 100, 3]",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Gán lát cắt rỗng `lst[1:1] = [100]` thực hiện chèn phần tử `100` vào sau vị trí thứ nhất mà không xóa bỏ đi bất kỳ phần tử nào, thu về `[1, 100, 2, 3]`."
  },
  {
    id: 5031,
    category: Category.PYTHON_BASICS,
    questionText: "Hãy cho biết kết quả hiển thị của đoạn chương trình dưới đây: (Kiến thức về Phương thức update() của Set)",
    codeSnippet: "s = {1, 2}\ns.update([2, 3, 4])\nprint(len(s))",
    options: [
      "A. 5",
      "B. 4",
      "C. 3",
      "D. AttributeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `.update()` hợp nhất các phần thêm vào và triệt tiêu tính trùng lặp. Tập `s` sau cập nhật chứa `{1, 2, 3, 4}`, có độ dài 4."
  },
  {
    id: 5032,
    category: Category.PYTHON_BASICS,
    questionText: "Khi chạy đoạn mã dưới đây, kết quả in ra là gì? (Kiến thức về Sắp xếp mảng hỗn hợp)",
    codeSnippet: "lst = [3, \"2\", 1]\nlst.sort()\nprint(lst)",
    options: [
      "A. [1, \"2\", 3]",
      "B. [1, 3, \"2\"]",
      "C. TypeError",
      "D. [3, \"2\", 1]"
    ],
    correctAnswerIndex: 2,
    explanation: "Trình thông dịch Python không thể so sánh trực tiếp kiểu số nguyên (`int`) và chuỗi ký tự (`str`) bằng thuật toán sắp xếp ngầm định. Lệnh `.sort()` sẽ quăng ra lỗi `TypeError`."
  },
  {
    id: 5033,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Hàm zip())",
    codeSnippet: "a = [1, 2]\nb = [\"A\", \"B\", \"C\"]\nprint(len(list(zip(a, b))))",
    options: [
      "A. 2",
      "B. 3",
      "C. 5",
      "D. ValueError"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `zip()` sẽ tự động cắt ngắn và ghép cặp theo chuỗi có kích thước tối thiểu ban đầu. Ở đây `a` chỉ chứa 2 phần tử nên kết quả ghép cặp chỉ tạo ra 2 phần tử tuple."
  },
  {
    id: 5034,
    category: Category.PYTHON_BASICS,
    questionText: "Output của chương trình dưới đây là gì? (Kiến thức về Ép kiểu từ Set sang List)",
    codeSnippet: "x = [1, 2, 2, 3]\ny = list(set(x))\nprint(y == x)",
    options: [
      "A. True",
      "B. False",
      "C. TypeError",
      "D. NameError"
    ],
    correctAnswerIndex: 1,
    explanation: "Set loại bỏ các số 2 trùng lặp và lưu thành `{1, 2, 3}`. Chuyển lại thành list `y` thành `[1, 2, 3]`. So sánh `y == x` tịt ngòi (False) vì khác cấu trúc ban đầu."
  },
  {
    id: 5035,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả hiển thị của đoạn chương trình sau là gì? (Kiến thức về is vs ==)",
    codeSnippet: "a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)",
    options: [
      "A. True True",
      "B. True False",
      "C. False True",
      "D. False False"
    ],
    correctAnswerIndex: 1,
    explanation: "`a == b` evaluates True vì các phần tử chứa trị y hệt nhau. `a is b` evaluates False vì hai biến quản lý hai đối tượng khởi tạo độc lập trên thanh ghi vùng nhớ khác nhau."
  },
  {
    id: 5036,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Kiến thức về Khởi tạo mảng hai chiều rỗng đa tầng)",
    codeSnippet: "matrix = [[0] * 2] * 2\nmatrix[0][0] = 1\nprint(matrix[1][0])",
    options: [
      "A. 0",
      "B. 1",
      "C. IndexError",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép nhân danh sách đa lồng `[[0]*2]*2` sao chép cạn tham chiếu của mảng con. Nghĩa là dòng 0 và dòng 1 trỏ chung vào 1 danh sách duy nhất. Do đó đổi `matrix[0][0]` cũng làm đổi `matrix[1][0]` thành 1."
  },
  {
    id: 5037,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Kiến thức về Trích xuất chuỗi định dạng)",
    codeSnippet: "s = \"A-B-C-D\"\nprint(s.split(\"-\", 2))",
    options: [
      "A. [\"A\", \"B\", \"C-D\"]",
      "B. [\"A\", \"B\", \"C\", \"D\"]",
      "C. [\"A-B\", \"C-D\"]",
      "D. TypeError"
    ],
    correctAnswerIndex: 0,
    explanation: "`s.split(\"-\", 2)` chỉ định rõ số lần cắt tối đa là 2 phiên cắt. Nó sẽ cắt ra phần đầu 'A', phần giữa 'B', phần đuôi gom toàn bộ là 'C-D' chứ không cắt tiếp."
  },
  {
    id: 5038,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của đoạn mã sau là gì? (Kiến thức về Đếm số lần xuất hiện count())",
    codeSnippet: "s = \"banana\"\nprint(s.count(\"ana\"))",
    options: [
      "A. 2",
      "B. 1",
      "C. 3",
      "D. 0"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `.count()` tìm kiếm các phân mẫu con không chồng chéo (non-overlapping). Trình dò tìm thấy 'ana' ở giữa 'b**ana**na', từ chỉ số 1 tiếp tục dò từ vị trí 4, do đó không đếm tiếp 'ana' đuôi nữa. Kết quả bằng 1."
  },
  {
    id: 5039,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã sau đây là gì? (Kiến thức về Slicing với Step âm)",
    codeSnippet: "a = [1, 2, 3, 4, 5]\nprint(a[3:1:-1])",
    options: [
      "A. [4, 3]",
      "B. [4, 3, 2]",
      "C. [3, 2]",
      "D. []"
    ],
    correctAnswerIndex: 0,
    explanation: "Slicing `a[3:1:-1]` quét chỉ số lùi từ mốc 3 về mốc 1 (bao gồm chỉ số 3, 2 không bao gồm 1), với bước nhảy -1. Phần tử vị trí 3 là 4, vị trí 2 là 3. Trả về `[4, 3]`."
  },
  {
    id: 5040,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau. Cho biết kết quả khi thực thi: (Kiến thức về Xử lý chuỗi nâng cao)",
    codeSnippet: "s = \"python\"\nprint(s.capitalize())\nprint(s.upper())",
    options: [
      "A. Python và PYTHON",
      "B. python và PYTHON",
      "C. PYTHON và PYTHON",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `.capitalize()` chuyển đổi ký tự đầu tiên thành chữ hoa, những ký tự sau giữ thường còn `.upper()` đẩy toàn chuỗi lên chữ in hoa."
  },
  {
    id: 5041,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra của chương trình dưới đây là gì? (Kiến thức về Dictionary Comprehension nâng cao)",
    codeSnippet: "d = {x: x % 2 == 0 for x in range(3)}\nprint(d[2])",
    options: [
      "A. True",
      "B. False",
      "C. 0",
      "D. KeyError"
    ],
    correctAnswerIndex: 0,
    explanation: "Dictionary sinh ra là `{0: True, 1: False, 2: True}`. Vậy giá trị phục vụ khóa 2 là giá trị logic `True`."
  },
  {
    id: 5042,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết giá trị trả về của chương trình sau: (Kiến thức về sorted() với hàm khóa tự định nghĩa)",
    codeSnippet: "a = [\"apple\", \"kiwi\", \"banana\"]\nb = sorted(a, key=len)\nprint(b[0])",
    options: [
      "A. apple",
      "B. kiwi",
      "C. banana",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `sorted` phân loại mảng theo độ dài đo lường chuỗi (`len`). Chuỗi 'kiwi' (4 ký tự) ngắn nhất trong bộ sẽ đứng ở đầu mảng sau sắp xếp."
  },
  {
    id: 5043,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả khi chạy đoạn mã dưới đây là gì? (Kiến thức về Loại bỏ khóa khỏi Dictionary với pop())",
    codeSnippet: "d = {\"a\": 1, \"b\": 2}\nval = d.pop(\"c\", 3)\nprint(val)",
    options: [
      "A. KeyError",
      "B. 3",
      "C. None",
      "D. 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `.pop(key, default)` tách lấy giá trị dựa trên khóa. Nếu không tìm thấy khóa 'c' sẵn có, nó không văng lỗi mà nhẹ nhàng trả về giá trị mặc định chỉ định sau là 3."
  },
  {
    id: 5044,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Kiến thức về Tạo generator cơ bản)",
    codeSnippet: "g = (x*x for x in range(3))\nprint(type(g))",
    options: [
      "A. <class 'tuple'>",
      "B. <class 'generator'>",
      "C. <class 'list'>",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Khai báo bọc trong cặp ngoặc đơn `(expression for vars in iter)` sản sinh ra một đối tượng `generator` tối ưu hóa bộ nhớ chứ không phải tuple."
  },
  {
    id: 5045,
    category: Category.RECURSION_OOP,
    questionText: "Output của đoạn chương trình dưới đây là gì? (Kiến thức về Tính kế thừa đệ quy Fibonacci)",
    codeSnippet: "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(5))",
    options: [
      "A. 5",
      "B. 8",
      "C. 3",
      "D. 13"
    ],
    correctAnswerIndex: 0,
    explanation: "Trình tự tính dãy đố Fibonacci: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5."
  },
  {
    id: 5046,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra màn hình của đoạn mã sau là gì? (Kiến thức về Kiểu Tuple lồng nhau)",
    codeSnippet: "t = (1, 2, [3, 4])\nt[2][0] = 100\nprint(t)",
    options: [
      "A. (1, 2, [3, 4])",
      "B. (1, 2, [100, 4])",
      "C. TypeError",
      "D. (1, 2, 100)"
    ],
    correctAnswerIndex: 1,
    explanation: "Dù Tuple là bất biến (immutable), không cho thay thế danh mục con của chính nó. Nhưng phần tử ở chỉ mục 2 lại là một đối tượng List khả biến (mutable). Ta sửa thành viên của list này bình thường: `t[2][0] = 100` thành công."
  },
  {
    id: 5047,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết kết quả in ra màn hình của đoạn mã dưới đây: (Kiến thức về Slicing ngoài giới hạn tối đa)",
    codeSnippet: "a = [1, 2, 3]\nprint(a[5:])",
    options: [
      "A. IndexError",
      "B. []",
      "C. [3]",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép chỉ mục thông thường truy cập trực tiếp `a[5]` quăng ra lỗi `IndexError`. Tuy nhiên cơ chế Lát Cắt Slicing dốc lòng an toàn tự động điều trị ranh giới, nếu vượt ngưỡng nó chỉ đơn giản trả về một danh sách rỗng `[]`."
  },
  {
    id: 5048,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra của chương trình dưới đây là gì? (Kiến thức về So sánh các tập Set)",
    codeSnippet: "a = {1, 2}\nb = {1, 2, 3}\nprint(a.issubset(b))",
    options: [
      "A. True",
      "B. False",
      "C. AttributeError",
      "D. TypeError"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `.issubset()` thông số hóa thẩm tra xem tập hợp `a` có thuộc về tập mẹ con `b` hay không. `{1, 2}` là tập con của `{1, 2, 3}` nên trả về True."
  },
  {
    id: 5049,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biết đầu ra của đoạn code sau đây: (Kiến thức về So sánh các kiểu số khác nhau)",
    codeSnippet: "print(0.1 + 0.2 == 0.3)",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Do giới hạn của cấu trúc dấu phẩy động cơ nhị phân (IEEE 754 float precision), phép tính `0.1 + 0.2` sản sinh ra con số xấp xỉ `0.30000000000000004` khiến so sánh tuyệt đối với 0.3 bị sai (False)."
  },
  {
    id: 5050,
    category: Category.DEBUGGING_TESTING,
    questionText: "Đoạn mã sau in ra kết quả gì? (Kiến thức về Xử lý ngoại lệ try-except-finally)",
    codeSnippet: "def test():\n    try:\n        return 1\n    finally:\n        return 2\n\nprint(test())",
    options: [
      "A. 1",
      "B. 2",
      "C. TypeError",
      "D. Không in ra gì cả"
    ],
    correctAnswerIndex: 1,
    explanation: "Khối `finally` bảo trợ thực thi tối hậu trước khi thoát ra khỏi hàm. Kể cả khối `try` có ra lệnh `return 1`, Python vẫn ghé trạm gác `finally` và ghi đè giá trị trả về thành 2."
  },

  // SECTION 3: Đệ quy, Kiểu dữ liệu nâng cao và Kỹ thuật lập trình (Q51 - Q75)
  {
    id: 5051,
    category: Category.PYTHON_BASICS,
    questionText: "Cho hai tập hợp A = {1, 2, 3} và B = {3, 4, 5}. Lệnh nào sau đây dùng để lấy ra phần tử chung của cả hai tập hợp?",
    options: [
      "A. A.union(B)",
      "B. A.intersection(B)",
      "C. A.difference(B)",
      "D. A.symmetric_difference(B)"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm toán tử tập bộ `.intersection()` đại diện cho phép Giao thực hiện thu thập phần tử chung xuất hiện đồng thời trong cả hai tập."
  },
  {
    id: 5052,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Kiến thức về Shallow Copy trong danh sách hai chiều)",
    codeSnippet: "matrix = [[0]*3]*3\nmatrix[0][0] = 5\nprint(matrix[1][0])",
    options: [
      "A. 0",
      "B. 5",
      "C. IndexError",
      "D. None"
    ],
    correctAnswerIndex: 1,
    explanation: "Giống như câu hỏi hoán dụ trước, `[[0]*3]*3` khởi tạo các hàng trỏ vào một bộ nhớ duy nhất. Thao tác trên hàng trước đổi giá trị của hàng sau."
  },
  {
    id: 5053,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn chương trình sau là gì? (Sự kết hợp của Lambda và hàm map())",
    codeSnippet: "nums = [1, 2, 3]\nresult = list(map(lambda x: x * 2, nums))\nprint(result)",
    options: [
      "A. [1, 2, 3]",
      "B. [2, 4, 6]",
      "C. [1, 2, 3, 1, 2, 3]",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "`map()` lặp ánh xạ hàm nặc danh nhân đôi giá trị của từng phần tử mảng, cho thu về mảng mới `[2, 4, 6]`."
  },
  {
    id: 5054,
    category: Category.PYTHON_BASICS,
    questionText: "Điều kiện biểu thức nào dưới đây tạo ra một generator thay vì list trong Python?",
    options: [
      "A. [x * x for x in range(5)]",
      "B. {x * x for x in range(5)}",
      "C. (x * x for x in range(5))",
      "D. dict(x * x for x in range(5))"
    ],
    correctAnswerIndex: 2,
    explanation: "Cú pháp bọc ngoặc tròn xung quanh một comprehension quy nạp tạo lập Generator vật lý lưu vết cấu trúc lười đánh giá (lazily-evaluated)."
  },
  {
    id: 5055,
    category: Category.PYTHON_BASICS,
    questionText: "Cách truyền tham số nào sau đây cho phép hàm nhận một số lượng tham số tùy biến không định danh (Positional Arguments) dưới dạng một Tuple?",
    options: [
      "A. *args",
      "B. **kwargs",
      "C. args",
      "D. kwargs"
    ],
    correctAnswerIndex: 0,
    explanation: "Từ khóa định nghĩa tham số với tiền tố một dấu sao `*args` đóng vai trò giải nén và hút gọn các đối số vị trí không giới hạn thành một cấu trúc Tuple duy nhất."
  },
  {
    id: 5056,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã sau là gì? (Kiến thức về List Slicing với Step âm)",
    codeSnippet: "arr = [10, 20, 30, 40, 50]\nprint(arr[::-2])",
    options: [
      "A. [50, 40, 30, 20, 10]",
      "B. [50, 30, 10]",
      "C. [10, 30, 50]",
      "D. [20, 40]"
    ],
    correctAnswerIndex: 1,
    explanation: "Cấu trúc lát cắt `[::-2]` quét ngược danh sách từ cuối cùng nhảy bước bằng 2 đơn vị: xuất phát từ chỉ số -1 (50) -> chỉ số -3 (30) -> chỉ số -5 (10). Cho kết quả: `[50, 30, 10]`."
  },
  {
    id: 5057,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn code dưới đây là gì? (Sử dụng phương thức update() trong Dictionary)",
    codeSnippet: "d1 = {\"a\": 1, \"b\": 2}\nd2 = {\"b\": 3, \"c\": 4}\nd1.update(d2)\nprint(d1[\"b\"])",
    options: [
      "A. 2",
      "B. 3",
      "C. 5",
      "D. KeyError"
    ],
    correctAnswerIndex: 1,
    explanation: "Lệnh cập nhật `.update()` của từ điển đè chồng giá trị của các khóa trùng lặp và bổ sung khóa chưa có. Giá trị tại khóa 'b' được định đoạt theo dữ liệu của `d2` là 3."
  },
  {
    id: 5058,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức nào của String trong Python được dùng để loại bỏ khoảng trắng ở cả hai đầu của chuỗi?",
    options: [
      "A. strip()",
      "B. split()",
      "C. clean()",
      "D. replace()"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `.strip()` quét sạch toàn bộ khoảng trắng dư thừa lẫn dấu xuống dòng bao quanh hai đầu ngoài cùng của chuỗi."
  },
  {
    id: 5059,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả của biểu thức sau là gì? (Độ ưu tiên của toán tử Logic)",
    codeSnippet: "print(True or False and False)",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Error"
    ],
    correctAnswerIndex: 0,
    explanation: "Trong bảng thứ tự ưu tiên của Python, toán tử `and` đứng ở thứ hạng cao hơn toán tử `or`. Biểu thức tương đương: `True or (False and False)` => `True or False` => `True`."
  },
  {
    id: 5060,
    category: Category.RECURSION_OOP,
    questionText: "Cho đoạn mã sau. Output khi chạy chương trình là gì? (Kế thừa nhưng quên gọi super().__init__())",
    codeSnippet: "class Parent:\n    def __init__(self):\n        self.x = 10\n\nclass Child(Parent):\n    def __init__(self):\n        self.y = 20\n\nc = Child()\nprint(c.x)",
    options: [
      "A. 10",
      "B. 20",
      "C. AttributeError",
      "D. None"
    ],
    correctAnswerIndex: 2,
    explanation: "Lớp `Child` nạp đè hàm khởi tạo `__init__` nhưng không triệu gọi `super().__init__()` vốn chịu trách nhiệm kiến thiết cơ nghiệp cho cha. Do đó biến thuộc tính `x` chưa được cấu tạo, gây ra lỗi `AttributeError` khi cố truy cập."
  },
  {
    id: 5061,
    category: Category.ALGORITHMS,
    questionText: "Cho biết độ phức tạp thời gian (Time Complexity) của đoạn mã sau:",
    codeSnippet: "def func(n):\n    i = n\n    while i > 1:\n        i = i // 2",
    options: [
      "A. O(n^2)",
      "B. O(n log n)",
      "C. O(n)",
      "D. O(log n)"
    ],
    correctAnswerIndex: 3,
    explanation: "Biến lặp `i` bị chia liên tục cho 2 sau mỗi vòng lặp. Số lần thực thi phép lặp để đưa `i` từ n về dưới 1 tương đương với hàm logarit cơ số 2 của n, hay O(log n)."
  },
  {
    id: 5062,
    category: Category.ALGORITHMS,
    questionText: "Cho biết độ phức tạp thời gian của hàm đệ quy sau đây:",
    codeSnippet: "def recurse(n):\n    if n <= 1:\n        return 1\n    return recurse(n - 1) + recurse(n - 2)",
    options: [
      "A. O(n)",
      "B. O(2^n)",
      "C. O(n^2)",
      "D. O(log n)"
    ],
    correctAnswerIndex: 1,
    explanation: "Mỗi bước gọi đệ quy Fibonacci không tối ưu hóa phân rã ra thêm 2 nhánh mới, tạo sơ đồ cây thuật toán với chiều sâu n. Số thao tác tăng tốc độ số mũ xấp xỉ O(2^n)."
  },
  {
    id: 5063,
    category: Category.ALGORITHMS,
    questionText: "Cấu trúc dữ liệu nào giúp kiểm tra sự tồn tại của một phần tử nhanh nhất trong trường hợp trung bình?",
    options: [
      "A. List",
      "B. Dictionary / Set (Hash Map)",
      "C. Tuple",
      "D. Linked List"
    ],
    correctAnswerIndex: 1,
    explanation: "Set và Dictionary tận dụng cấu trúc bảng băm (Hash map) đạt hiệu quả tra cứu cực hạn ở mức độ phức tạp O(1) trong điều kiện thường, bỏ xa bệ tìm kiếm tuần tự O(n) của mảng hay danh sách liên kết."
  },
  {
    id: 5064,
    category: Category.ALGORITHMS,
    questionText: "Thuật toán sắp xếp nào sau đây được coi là 'Stable Sort' (Sắp xếp ổn định)?",
    options: [
      "A. Quick Sort",
      "B. Merge Sort",
      "C. Heap Sort",
      "D. Selection Sort"
    ],
    correctAnswerIndex: 1,
    explanation: "`Merge Sort` (Sắp xếp trộn) là một thuật toán sắp xếp ổn định (Stable Sort), bảo toàn thứ tự ban đầu của các phần tử có cùng giá trị so sánh khóa."
  },
  {
    id: 5065,
    category: Category.RECURSION_OOP,
    questionText: "Hàm isinstance(obj, classinfo) trả về giá trị gì nếu obj là một thực thể của lớp con của classinfo?",
    options: [
      "A. True",
      "B. False",
      "C. TypeError",
      "D. None"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `isinstance` thẩm định tính năng kế thừa: Một thực thể của lớp con hiển nhiên được công nhận là một thực thể thuộc lớp cha của nó, trả về True."
  },
  {
    id: 5066,
    category: Category.FILES_LIBRARIES,
    questionText: "Chế độ mặc định khi mở một file bằng hàm open(\"data.txt\") trong Python là gì?",
    options: [
      "A. 'w' (Ghi file)",
      "B. 'r' (Đọc file văn bản)",
      "C. 'a' (Ghi thêm)",
      "D. 'rb' (Đọc nhị phân)"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `open()` mặc định áp dụng chế độ mở đọc file văn bản `'r'` (Read text file) nếu lập trình viên không chỉ định cách mở cụ thể khác."
  },
  {
    id: 5067,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Sửa đổi List khi đang lặp)",
    codeSnippet: "nums = [1, 2, 3, 4]\nfor x in nums:\n    if x % 2 == 0:\n        nums.remove(x)\nprint(nums)",
    options: [
      "A. [1, 3]",
      "B. [1, 2, 3, 4]",
      "C. [1, 3, 4]",
      "D. RuntimeError"
    ],
    correctAnswerIndex: 2,
    explanation: "Việc thu xếp thu hồi phần tử trong khi đang duyệt vòng lặp phá vỡ tuần tự tăng chỉ số rà soát mẫu. Duyệt 2 nới lùi danh sách khiến chỉ mục kế tiếp đẩy phắt qua số 3 và chộp vào số 4. Kết quả thu về dở khóc dở cười là `[1, 3, 4]`."
  },
  {
    id: 5068,
    category: Category.PYTHON_BASICS,
    questionText: "Điền vào chỗ trống để đoạn code sau in ra màn hình thương số dưới dạng số nguyên (Chia lấy nguyên):",
    codeSnippet: "print(11 ... 3)  # Output mong muon: 3",
    options: [
      "A. /",
      "B. //",
      "C. %",
      "D. **"
    ],
    correctAnswerIndex: 1,
    explanation: "Toán tử `//` (floor division) thực hiện chia lấy thương nguyên và triệt tiêu sạch mảng phân số thập phân đằng sau."
  },
  {
    id: 5069,
    category: Category.PYTHON_BASICS,
    questionText: "Quy tắc nào định nghĩa thứ tự tìm kiếm phạm vi biến (Namespace Scope) trong Python?",
    options: [
      "A. GBEL",
      "B. LEGB (Local -> Enclosing -> Global -> Built-in)",
      "C. LGEB",
      "D. BEGL"
    ],
    correctAnswerIndex: 1,
    explanation: "Cơ chế phân giải định danh của Python tuyệt đối chấp hành quy tắc tìm kiếm theo luồng LEGB xếp lớp từ vùng trong ra vùng ngoài: Local -> Enclosing -> Global -> Built-in."
  },
  {
    id: 5070,
    category: Category.PYTHON_BASICS,
    questionText: "Output của đoạn mã sau là gì?",
    codeSnippet: "d = {0: \"Zero\", 1: \"One\"}\nprint(all(d))",
    options: [
      "A. True",
      "B. False",
      "C. TypeError",
      "D. KeyError"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `all()` trên một từ điển thực hiện quét kiểm định chân lý các Khóa (Keys). Khóa thứ nhất là số 0 tương đương giá trị boolean `False` khiến hàm `all` trả về False."
  },
  {
    id: 5071,
    category: Category.DEBUGGING_TESTING,
    questionText: "Output của đoạn chương trình dưới đây là gì? (Cách thức bắt ngoại lệ lồng nhau)",
    codeSnippet: "try:\n    x = 1 / 0\nexcept Exception:\n    print(\"Exception\")\nexcept ZeroDivisionError:\n    print(\"ZeroDivision\")",
    options: [
      "A. ZeroDivision",
      "B. Exception",
      "C. ZeroDivisionError",
      "D. Chương trình bị sập và báo lỗi"
    ],
    correctAnswerIndex: 1,
    explanation: "Nhánh chặn lỗi rà soát từ trên xuống dưới. Vì lớp cha `Exception` đứng trước lớp con chuyên biệt `ZeroDivisionError`, nó lập tức ứng cứu tóm lấy lỗi chia không này khiến chặng rào sau không có cơ hội thể hiện."
  },
  {
    id: 5072,
    category: Category.FILES_LIBRARIES,
    questionText: "Để thiết lập giới hạn độ sâu đệ quy lớn hơn trong Python nhằm tránh lỗi RecursionError, ta dùng thư viện nào?",
    options: [
      "A. os",
      "B. sys",
      "C. math",
      "D. random"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm cấu hình hệ thống `sys.setrecursionlimit(limit)` của thư viện `sys` cho phép điều khiển độ sâu tối đa của ngăn xếp đệ quy."
  },
  {
    id: 5073,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả của phép toán Bitwise 5 & 3 trong Python là gì?",
    options: [
      "A. 7",
      "B. 1",
      "C. 8",
      "D. 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Biểu diễn hệ nhị phân: 5 là `101`, 3 là `011`. Phép giao nhị phân `&` đối chiếu từng cột: `101 & 011 = 001` (bằng 1 ở hệ thập phân)."
  },
  {
    id: 5074,
    category: Category.PYTHON_BASICS,
    questionText: "Từ phiên bản Python 3.9, toán tử nào được sử dụng để gộp hai Dictionary một cách nhanh chóng?",
    options: [
      "A. +",
      "B. *",
      "C. |",
      "D. &"
    ],
    correctAnswerIndex: 2,
    explanation: "Toán tử sáp nhập từ điển `|` (Union operator) được giới thiệu chính thức từ Python 3.9 để gộp nhanh hai từ điển gọn gẽ thay thế cho phương thức đè cũ."
  },
  {
    id: 5075,
    category: Category.PYTHON_BASICS,
    questionText: "Để tạo một bản sao hoàn toàn độc lập của một đối tượng phức tạp lồng nhau (không chia sẻ bất kỳ liên kết bộ nhớ con nào), ta sử dụng phương thức nào?",
    options: [
      "A. copy.copy()",
      "B. copy.deepcopy()",
      "C. list()",
      "D. dict()"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức sao chép sâu `copy.deepcopy()` lội qua tất cả dữ liệu mảng con đa tầng để nhân bản thực thể cứng cáp, phá vỡ chia chung liên đới tham chiếu dữ liệu cũ."
  },

  // SECTION 4: Độ phức tạp Thuật toán, OOP, Thiết kế Hệ thống và Ngoại lệ (Q76 - Q100)
  {
    id: 5076,
    category: Category.PYTHON_BASICS,
    questionText: "Trong ba cách định dạng chuỗi sau, cách nào có hiệu năng xử lý nhanh nhất và được khuyên dùng từ Python 3.6+?",
    options: [
      "A. Định dạng dùng toán tử %",
      "B. Định dạng dùng phương thức .format()",
      "C. Định dạng dùng f-string (f\"...\")",
      "D. Cả ba cách có tốc độ bằng nhau"
    ],
    correctAnswerIndex: 2,
    explanation: "`f-string` thực thi nhanh vượt trội vì được biên dịch và tối ưu hóa trực tiếp sang bytecode tại thời điểm chạy chứ không cần qua bước xử lý lồng phức tạp."
  },
  {
    id: 5077,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau bị lỗi ở dòng nào?",
    codeSnippet: "x = 10\ndef change():\n    print(x)\n    global x\n    x = 20\nchange()",
    options: [
      "A. Không có lỗi",
      "B. Gần dòng khai báo global x (đặt sau print(x))",
      "C. Lỗi tại dòng x = 20",
      "D. Lỗi tại dòng x = 10"
    ],
    correctAnswerIndex: 1,
    explanation: "Khai báo `global x` bắt buộc nằm trên đỉnh của hàm trước khi có bất kỳ thao tác truy cập trị nào chạm vào `x`. Việc gọi đọc `print(x)` trước khi khai báo phạm vi biến sẽ gây lỗi cú pháp."
  },
  {
    id: 5078,
    category: Category.PYTHON_BASICS,
    questionText: "Phép toán nào lấy ra các phần tử có trong tập hợp A mà không có trong tập hợp B?",
    options: [
      "A. A | B",
      "B. A & B",
      "C. A - B",
      "D. A ^ B"
    ],
    correctAnswerIndex: 2,
    explanation: "Toán tử hiệu `-` (Difference) thực hiện lọc trừ khử sạch những thành phần giao thoa thuộc tập `B` ra thỏai mái khỏi tập mẹ `A`."
  },
  {
    id: 5079,
    category: Category.ALGORITHMS,
    questionText: "Kỹ thuật tối ưu hóa đệ quy bằng cách lưu lại kết quả của các bài toán con đã giải để tránh tính toán lại được gọi là gì?",
    options: [
      "A. Backtracking (Quay lui)",
      "B. Memoization (Ghi nhớ)",
      "C. Divide and Conquer (Chia để trị)",
      "D. Greedy (Tham lam)"
    ],
    correctAnswerIndex: 1,
    explanation: "`Memoization` (Ghi nhớ) là phương án lưu bảng nhớ nạp nhanh các kết quả đệ quy trùng lặp, nâng tầm hiệu suất bài toán từ số mũ về số tuyến tính."
  },
  {
    id: 5080,
    category: Category.PYTHON_BASICS,
    questionText: "Trong Python, tại sao chuỗi ký tự (String) được thiết kế là đối tượng bất biến (Immutable)?",
    options: [
      "A. Để tối ưu hóa bộ nhớ thông qua String Interning và bảo đảm an toàn đa luồng.",
      "B. Để cho phép chuỗi làm khóa (key) của Dictionary.",
      "C. Để tránh việc thay đổi dữ liệu ngoài ý muốn.",
      "D. Tất cả các phương án trên đều đúng."
    ],
    correctAnswerIndex: 3,
    explanation: "Tính chất bất biến (immutability) đóng góp tổng lực cho giải pháp an toàn đa tầng: tối ưu hóa lưu trú vùng nhớ băm khóa tra cứu và đề phòng lỗi thao tác chồng đè dữ liệu tệp."
  },
  {
    id: 5081,
    category: Category.PYTHON_BASICS,
    questionText: "Kiểu dữ liệu nào dưới đây KHÔNG thể làm khóa (Key) của một Dictionary trong Python?",
    options: [
      "A. Tuple",
      "B. List",
      "C. String",
      "D. Frozenset"
    ],
    correctAnswerIndex: 1,
    explanation: "Khóa của Dictionary phải thuộc nhóm bất biến và có thể băm (hashable). Danh sách `List` là cấu trúc có thể thay đổi tùy ý (mutable) nên bị nghiêm cấm dùng làm khóa từ điển."
  },
  {
    id: 5082,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau in ra giá trị nào? (Cơ chế gán đa biến)",
    codeSnippet: "a = 1\nb = 2\na, b = b, a\nprint(a, b)",
    options: [
      "A. 1 2",
      "B. 2 1",
      "C. 2 2",
      "D. 1 1"
    ],
    correctAnswerIndex: 1,
    explanation: "Cú pháp hoán vị giá trị `a, b = b, a` đánh giá các vế dạng tuple rồi gán song song an toàn, không cần dựng biến hữu hạn tạm thời để tản nhiệt lưu giữ trị."
  },
  {
    id: 5083,
    category: Category.ALGORITHMS,
    questionText: "Để thực hiện việc giải nén (Unpack) một danh sách các Tuple ngược lại thành các danh sách riêng biệt bằng hàm zip(), ta dùng toán tử nào?",
    options: [
      "A. Toán tử * (Ví dụ: zip(*data))",
      "B. Toán tử **",
      "C. Toán tử &",
      "D. Toán tử /"
    ],
    correctAnswerIndex: 0,
    explanation: "Toán tử một sao `*` trước đối số mảng kích hoạt cơ chế unpacking rải mảng phẳng dòng làm đầu vào độc lập nuôi bộ lắp ráp `zip` để tách chuỗi ngược dòng."
  },
  {
    id: 5084,
    category: Category.ALGORITHMS,
    questionText: "Làm cách nào để sắp xếp danh sách các Tuple sau theo giá trị thứ hai tăng dần của mỗi Tuple?",
    codeSnippet: "data = [(\"A\", 3), (\"B\", 1), (\"C\", 2)]",
    options: [
      "A. data.sort()",
      "B. data.sort(key=lambda x: x[1])",
      "C. sorted(data)",
      "D. data.sort(key=lambda x: x[0])"
    ],
    correctAnswerIndex: 1,
    explanation: "Tham số `key` gán hàm lambda lấy giá trị chỉ số 1 `lambda x: x[1]` (phần tử thứ hai trong các cặp tuple) làm căn cứ vàng bốc xếp sắp đặt thứ bậc nâng."
  },
  {
    id: 5085,
    category: Category.RECURSION_OOP,
    questionText: "Khái niệm 'First-class Functions' trong Python có nghĩa là gì?",
    options: [
      "A. Hàm chỉ có thể được định nghĩa ở cấp độ global cao nhất.",
      "B. Hàm có thể được truyền dưới dạng tham số, trả về từ hàm khác và gán cho biến.",
      "C. Hàm luôn có tốc độ thực thi nhanh nhất.",
      "D. Chỉ các hàm tích hợp sẵn (Built-in) mới là First-class."
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm hạng nhất (First-class function) cho phép đối xử với các khối thuật toán hàm xử lý ngang hàng với bất kỳ kiểu dữ liệu số cơ bản hay chuỗi bình thường."
  },
  {
    id: 5086,
    category: Category.ALGORITHMS,
    questionText: "Cho ba danh sách A, B, C. Cách nào sau đây lấy ra nhanh nhất các phần tử chung của cả ba danh sách?",
    options: [
      "A. Dùng vòng lặp for lồng nhau duyệt qua cả ba danh sách.",
      "B. Chuyển đổi cả ba thành Set và dùng phép toán giao: set(A) & set(B) & set(C)",
      "C. Sử dụng hàm filter().",
      "D. Sử dụng thư viện itertools."
    ],
    correctAnswerIndex: 1,
    explanation: "Phép toán giao `&` trên cấu trúc bảng băm của đối tượng `Set` có tốc độ xử lý nhanh tuyệt đối mang tính hệ thống so với việc viết vòng lặp lồng rườm rà."
  },
  {
    id: 5087,
    category: Category.RECURSION_OOP,
    questionText: "Nhược điểm lớn nhất của việc lạm dụng thuật toán đệ quy so với vòng lặp thông thường là gì?",
    options: [
      "A. Tốn bộ nhớ Stack và có nguy cơ gây lỗi tràn bộ nhớ đệm (Stack Overflow).",
      "B. Khó viết mã nguồn hơn.",
      "C. Không thể áp dụng cho các bài toán phức tạp.",
      "D. Tốc độ biên dịch chương trình chậm hơn."
    ],
    correctAnswerIndex: 0,
    explanation: "Mỗi khung đệ quy triệu gọi chồng nạp một bản ghi lưu trữ các thông số lên bộ nhớ Stack của Hệ điều hành. Nếu lặp quá sâu, Stack cạn kiệt sẽ quăng lỗi tràn kịch khung dữ liệu."
  },
  {
    id: 5088,
    category: Category.FILES_LIBRARIES,
    questionText: "Trong Python, cấu trúc dữ liệu nào trong thư viện collections tối ưu nhất cho việc chèn và xóa phần tử ở cả hai đầu (Double-ended Queue)?",
    options: [
      "A. list",
      "B. deque",
      "C. OrderedDict",
      "D. heapq"
    ],
    correctAnswerIndex: 1,
    explanation: "`collections.deque` được sản xuất chuyên trách cho phép kéo nạp tháo dỡ dữ liệu ở cả hai đầu mảng với hiệu suất O(1), vượt trội so với list thông thường chịu phạt O(n) khi dịch chuyển hàng lẻ ở đầu."
  },
  {
    id: 5089,
    category: Category.PYTHON_BASICS,
    questionText: "Biểu thức logic 'not a and b or c' tương đương với biểu thức nào dưới đây dựa trên độ ưu tiên toán tử?",
    options: [
      "A. ((not a) and b) or c",
      "B. not (a and (b or c))",
      "C. (not a) and (b or c)",
      "D. not ((a and b) or c)"
    ],
    correctAnswerIndex: 0,
    explanation: "Thứ tự tôn thờ quyền ưu tiên từ lớn đến bé: `not` -> `and` -> `or`. Vì thế, rào chắn logic được bọc bẻ hướng tuần tự tương đương là `((not a) and b) or c`."
  },
  {
    id: 5090,
    category: Category.PYTHON_BASICS,
    questionText: "Để lọc ra các phần tử duy nhất từ một danh sách mà vẫn muốn GIỮ NGUYÊN thứ tự ban đầu của chúng, ta nên làm thế nào?",
    options: [
      "A. list(set(arr))",
      "B. list(dict.fromkeys(arr))",
      "C. sorted(list(set(arr)))",
      "D. Duyệt mảng và thêm vào Set mới."
    ],
    correctAnswerIndex: 1,
    explanation: "`dict.fromkeys(arr)` triệt tiêu sự trùng lặp do khóa định tâm từ điển chỉ lưu duy nhất một bản đại diện, đồng thời tôn trọng bảo lưu nghiêm chỉnh thứ tự xuất hiện gốc."
  },
  {
    id: 5091,
    category: Category.PYTHON_BASICS,
    questionText: "Để thay đổi giá trị của một biến nằm ở phạm vi hàm bao bọc bên ngoài (Enclosing Scope) của một hàm lồng nhau (Nested Function), ta dùng từ khóa nào?",
    options: [
      "A. global",
      "B. nonlocal",
      "C. outer",
      "D. self"
    ],
    correctAnswerIndex: 1,
    explanation: "Từ khóa độc vị `nonlocal` khai báo với Python rằng biến mục tiêu nằm ở phạm vi bao hàm ngay phía ngoài (nhưng không phải là biến global toàn màn hình)."
  },
  {
    id: 5092,
    category: Category.PYTHON_BASICS,
    questionText: "Output của dòng lệnh sau đây là gì? (List Comprehension đa tầng)",
    codeSnippet: "print([x for row in [[1, 2], [3, 4]] for x in row])",
    options: [
      "A. [[1, 2], [3, 4]]",
      "B. [1, 2, 3, 4]",
      "C. [1, 3, 2, 4]",
      "D. TypeError"
    ],
    correctAnswerIndex: 1,
    explanation: "List comprehension đa tầng quét qua từng dòng `row` dòng trong matrix, rồi lại lột quét từng phần tử `x` trong `row` ấy ra ngoài nạp phẳng hoàn toàn vào mảng thu gọn `[1, 2, 3, 4]`."
  },
  {
    id: 5093,
    category: Category.RECURSION_OOP,
    questionText: "Python thực hiện cơ chế che giấu tên (Name Mangling) đối với các thuộc tính 'private' bắt đầu bằng hai dấu gạch dưới __ như thế nào để tránh xung đột kế thừa?",
    options: [
      "A. Chuyển đổi tên thành _ClassName__attributeName",
      "B. Chuyển đổi tên thành __attributeName_private",
      "C. Mã hóa tên thuộc tính thành chuỗi ngẫu nhiên.",
      "D. Ngăn chặn hoàn toàn việc truy cập từ bên ngoài lớp."
    ],
    correctAnswerIndex: 0,
    explanation: "Cơ chế Name mangling tự động đổi dán nhãn thuộc tính riêng tư `__attributeName` trong mã bytecode thành `_ClassName__attributeName` để ngăn chặn rủi ro tranh chấp tài sản vô cảm lúc thừa kế."
  },
  {
    id: 5094,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau in ra kết quả gì? (Tính toán giá trị mặc định của tham số khi định nghĩa hàm)",
    codeSnippet: "import time\ndef log(msg, t=time.time()):\n    time.sleep(1)\n    print(msg, t == time.time())\n\nlog(\"A\")",
    options: [
      "A. A True",
      "B. A False",
      "C. TypeError",
      "D. AttributeError"
    ],
    correctAnswerIndex: 1,
    explanation: "Giá trị của đối số mặc định `t=time.time()` được tính toán duy nhất một lần tại thời điểm định nghĩa hàm chèn nạp chứ không chạy lại lúc gọi hàm. Do đó khi gọi thì `time.time()` thực tế đã trôi qua 1 giây ngủ, biểu so sánh trả về False."
  },
  {
    id: 5095,
    category: Category.RECURSION_OOP,
    questionText: "Phương thức đặc biệt (Dunder Method) nào trong Python xác định giá trị Boolean khi gọi hàm bool(obj) trên một thực thể đối tượng?",
    options: [
      "A. __bool__",
      "B. __len__",
      "C. Cả __bool__ và __len__ đều có thể (Python ưu tiên __bool__ trước)",
      "D. __truth__"
    ],
    correctAnswerIndex: 2,
    explanation: "Khi gọi `bool(obj)`, Python ưu tiên tìm kiếm cậy cứu phương thức định nghĩa hành vi chân lý riêng `__bool__`. Nếu vắng bóng nó, Python sẽ nỗ lực nhìn sâu vào độ dài `__len__`, nếu length > 0 thì True, ngược lại False."
  },
  {
    id: 5096,
    category: Category.FILES_LIBRARIES,
    questionText: "Hàm nào trong thư viện math dùng để làm tròn số thực lên số nguyên gần nhất lớn hơn hoặc bằng nó?",
    options: [
      "A. math.floor()",
      "B. math.ceil()",
      "C. math.trunc()",
      "D. round()"
    ],
    correctAnswerIndex: 1,
    explanation: "Hàm `math.ceil()` (viết tắt của ceiling - trần nhà) được điều chế dùng để làm tròn phân số theo chiều hướng tiến lên bước số nguyên cao kế."
  },
  {
    id: 5097,
    category: Category.PYTHON_BASICS,
    questionText: "Để sửa ký tự đầu tiên của chuỗi s = \"python\" thành chữ viết hoa \"P\" mà không tạo ra chuỗi mới hoàn toàn, ta có thể làm thế nào?",
    options: [
      "A. s[0] = \"P\"",
      "B. Không thể thực hiện được vì String trong Python là bất biến (Immutable).",
      "C. s.replace(\"p\", \"P\", 1) nhưng thực chất phép toán này vẫn tạo ra chuỗi mới trong bộ nhớ.",
      "D. Cả B và C đều đúng."
    ],
    correctAnswerIndex: 3,
    explanation: "Do tính bất biến kiên định của lớp chuỗi hệ thống, bạn tuyệt đối không có khe hở kỹ thuật nào để thay mấu trị tại bộ nhớ cũ. Mọi hàm xử lý chỉnh lý chuỗi thực tế đều phải nhân bản chuỗi mới để phụng sự lập trình."
  },
  {
    id: 5098,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn chương trình sau đây in ra màn hình giá trị nào? (Cú pháp Unpacking nâng cao)",
    codeSnippet: "a, *b, c = [1, 2, 3, 4, 5]\nprint(b)",
    options: [
      "A. [2, 3, 4]",
      "B. 2, 3, 4",
      "C. [3]",
      "D. [1, 2, 3, 4, 5]"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép giải nén với sao nạp `*b` hốt trọn toàn cụm trung gian dồn vào một danh sách riêng biệt. Đầu nhận `a` tóm số 1, đuôi nhận `c` tóm số 5, ruột giữa `b` nhận phần còn lại là `[2, 3, 4]`."
  },
  {
    id: 5099,
    category: Category.PYTHON_BASICS,
    questionText: "Python sử dụng thuật toán chính nào dưới đây để thực hiện thu dọn rác bộ nhớ tự động (Garbage Collection)?",
    options: [
      "A. Mark and Sweep",
      "B. Đếm tham chiếu (Reference Counting) kết hợp với bộ phát hiện chu trình rác (Generational Garbage Collection).",
      "C. Stop-the-world",
      "D. LIFO Memory Management"
    ],
    correctAnswerIndex: 1,
    explanation: "Trọng tâm của động cơ thu dọn rác Python đựa trên việc kiểm đếm tham chiếu (Reference counting). Hệ thống còn gắn bó thêm bộ dò lặp chu trình phân thế hệ để giải cứu vùng nhớ cô lập tuần hoàn rỗng."
  },
  {
    id: 5100,
    category: Category.RECURSION_OOP,
    questionText: "Phương thức đặc biệt nào được nạp chồng (Overloaded) để thiết lập hành vi hiển thị chuỗi thân thiện khi gọi hàm print(obj)?",
    options: [
      "A. __repr__",
      "B. __str__",
      "C. __init__",
      "D. __show__"
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `__str__` chịu giao phó trách nhiệm biểu đạt cấu trúc thực thể ra văn bản rõ ràng, phục cụ các lượt gọi hiển thị `print()` trực sắc tới phía người dùng cuối."
  }
];
