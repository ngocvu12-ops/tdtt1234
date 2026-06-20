import { Question, Category } from "../types";
import { quizQuestions, getDetailedPythonCategory } from "./questions";


export interface PresetExam {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  questions: Question[];
}

const rawOetFinalExamCa1: Question[] = [
  {
    id: 1001,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau:\n\ndef solve(data):\n    result = []\n    for x in data:\n        if x % 2 == 0:\n            result.append(x * 2)\n        else:\n            result.append(x * 3)\n    return result\n\ndata = [int(x) for x in input().split()]\noutput = solve(data)\nprint(output)\n\nKhi phân tích đoạn mã trên dưới góc độ Computational Thinking, concept nào được áp dụng trọng tâm nhất?",
    options: [
      "Algorithm Design (Thiết kế thuật toán)",
      "Abstraction (Trừu tượng hóa)",
      "Pattern Recognition (Nhận diện mẫu)",
      "Decomposition (Phân rã bài toán)",
      "Không có đáp án đúng"
    ],
    correctAnswerIndex: 3,
    explanation: "Đoạn code thể hiện việc phân tách bài toán xử lý danh sách thành hai nhánh con riêng độc lập (chẵn nhân 2, lẻ nhân 3) và áp dụng phép nhân tuần tự. Góc nhìn này là Decomposition (Phân rã bài toán thành các thành tố đơn giản hơn để lập trình)."
  },
  {
    id: 1002,
    category: Category.ALGORITHMS,
    questionText: "Lựa chọn nào mô tả đúng nhất về “máy tính” (so với con người) trong giải quyết vấn đề?",
    options: [
      "Máy tính chỉ nhanh hơn con người khi bài toán nhỏ, còn dữ liệu lớn thì chậm.",
      "Máy tính không sáng tạo, xử lý dữ liệu lớn, rất nhanh và có độ chính xác cao.",
      "Máy tính sáng tạo, trực giác tốt, nhưng xử lý dữ liệu nhỏ.",
      "Máy tính sáng tạo kém, nhưng thường xuyên mắc lỗi nên phải debug liên tục.",
      "Máy tính có trực giác tốt hơn con người nên thường tìm ra giải pháp tối ưu."
    ],
    correctAnswerIndex: 1,
    explanation: "Máy tính về bản chất là một bộ máy vô cơ thực thi chính xác cao, không có tính sáng tạo hay trực giác tự nhiên, nhưng cực kỳ vượt trội con người về mặt xử lý khối lượng dữ liệu khổng lồ với tốc độ cực nhanh và chính xác."
  },
  {
    id: 1003,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm input() trong Python 3 luôn trả về dữ liệu thuộc kiểu nào?",
    options: [
      "Float (Số thực)",
      "Integer (Kiểu số nguyên int)",
      "Tùy thuộc vào nội dung người dùng nhập vào từ bàn phím",
      "String (Kiểu chuỗi str)"
    ],
    correctAnswerIndex: 3,
    explanation: "Trong Python 3, hàm `input()` luôn thu thập kí tự nhập từ bàn phím dưới dạng chuỗi văn bản thuần túy (str). Nếu muốn dùng dưới dạng số, ta phải ép kiểu thủ công như `int()` hay `float()`."
  },
  {
    id: 1004,
    category: Category.PYTHON_BASICS,
    questionText: "Những toán tử nào sau đây dùng để thực hiện phép chia lấy phần DƯ?",
    options: [
      "%",
      "div",
      "//",
      "/"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép toán lấy số dư trong Python sử dụng ký hiệu phần trăm `%`. Số nguyên `//` dùng để chia lấy phần nguyên, còn `/` trả về thương số thực."
  },
  {
    id: 1005,
    category: Category.PYTHON_BASICS,
    questionText: "Phát biểu nào sau đây đúng về biến cục bộ (local variable) trong Python?",
    options: [
      "Chỉ tồn tại trong suốt quá trình thực thi của hàm mà nó được khai báo.",
      "Được khai báo bên ngoài tất cả các hàm và có thể truy cập ở bất cứ đâu.",
      "Tự động trở thành biến toàn cục nếu hàm được gọi nhiều lần.",
      "Có thể được truy cập trực tiếp từ bên ngoài hàm bằng tên của nó."
    ],
    correctAnswerIndex: 0,
    explanation: "Biến cục bộ được khởi tạo bên trong một hàm, vòng đời của nó bị giới hạn chặt chẽ và chỉ tồn tại trong suốt thời gian hàm đó hoạt động. Nó tự hủy khi hàm hoàn thành dòng return."
  },
  {
    id: 1006,
    category: Category.PYTHON_BASICS,
    questionText: "Quy tắc đặt tên biến nào sau đây là SAI trong Python?",
    options: [
      "Tên biến có thể bắt đầu bằng một chữ số.",
      "Tên biến có thể chứa các chữ cái, chữ số và dấu gạch dưới (_).",
      "Không được sử dụng các từ khóa của Python làm tên biến.",
      "Tên biến có phân biệt chữ hoa và chữ thường.",
      "Tên biến có thể bắt đầu bằng một dấu gạch dưới (_)."
    ],
    correctAnswerIndex: 0,
    explanation: "Trong Python, tên biến không bao giờ được phép bắt đầu bằng ký tự chữ số (ví dụ: `1variable` là sai ngữ pháp), nhưng có thể chứa chữ số ở phía sau."
  },
  {
    id: 1007,
    category: Category.PYTHON_BASICS,
    questionText: "Xét độ ưu tiên toán tử trong biểu thức logic sau:\n\nx = 5\ny = 10\nz = 15\nres = (x < y) and (y > z) or not (x == z - 10)\nprint(res)\n\nGiá trị của biến 'res' được in ra màn hình là:",
    options: [
      "1",
      "False",
      "Error",
      "True"
    ],
    correctAnswerIndex: 1,
    explanation: "Từng bước định giá trị:\n- `(x < y)` là `5 < 10` -> True\n- `(y > z)` là `10 > 15` -> False\n- `(x < y) and (y > z)` -> `True and False` -> False\n- `(x == z - 10)` là `5 == 15 - 10` -> `5 == 5` -> True\n- `not (x == z - 10)` -> `not True` -> False\n- Kết quả: `False or False` -> False."
  },
  {
    id: 1008,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau:\n\nraining = True\nfreezing = False\n\nif raining and freezing:\n    print(\"Waterproof coat\")\nelif raining and (not freezing):\n    print(\"Umbrella\")\nelif (not raining) and freezing:\n    print(\"Warm coat\")\nelse:\n    print(\"Sweater\")\n\nChương trình sẽ in ra kết quả nào?",
    options: [
      "Sweater",
      "Umbrella",
      "Waterproof coat",
      "Không in ra bất cứ nội dung gì",
      "Warm coat"
    ],
    correctAnswerIndex: 1,
    explanation: "`raining` là True, `freezing` là False. Biểu thức điều kiện thứ hai: `raining and (not freezing)` tương đương `True and True` -> True. Nên nhánh này chạy và in ra 'Umbrella'."
  },
  {
    id: 1009,
    category: Category.PYTHON_BASICS,
    questionText: "Cho hàm sau:\n\ndef f(n):\n    if n % 2 == 0:\n        if n % 3 == 0:\n            return \"X\"\n        else:\n            return \"Y\"\n    else:\n        return \"Z\"\n\nGiá trị nào của n dưới đây sẽ làm hàm trả về chuỗi \"Y\"?",
    options: [
      "9",
      "21",
      "18",
      "12",
      "20"
    ],
    correctAnswerIndex: 4,
    explanation: "Hàm trả về \"Y\" khi n chia hết cho 2 (n lẻ trả về 'Z') và n không chia hết cho 3 (nếu chia hết cho 3 trả về 'X').\n- Số 20 chẵn nên vào trong, 20 không chia hết cho 3 nên trả về \"Y\" chính xác."
  },
  {
    id: 1010,
    category: Category.PYTHON_BASICS,
    questionText: "Giả sử a = 5 và b = 10. Biêu thức logic nào sau đây sẽ trả về giá trị True?",
    options: [
      "a < b and a != 5",
      "a > b or a == 5",
      "a == b",
      "not (a < b)"
    ],
    correctAnswerIndex: 1,
    explanation: "`a > b` là `5 > 10` (False). `a == 5` là đúng (True). Phép `or` giữa False và True cho ra True."
  },
  {
    id: 1011,
    category: Category.PYTHON_BASICS,
    questionText: "Xét luật truy cập sau đây:\n– Nhân viên có thẻ ➔ được vào cửa.\n– Khách có giấy mời ➔ được vào cửa.\n– Các trường hợp khác ➔ không được vào.\n\nDưới đây là một đoạn mã hiện thực luật trên:\n\ndef allow_access(is_employee, has_card, is_guest, has_invite):\n    if is_employee:\n        if has_card:\n            return True\n        else:\n            return False\n    if is_guest:\n        if has_invite:\n            return True\n        else:\n            return False\n    else:\n        return False\n\nKhi thực thi câu lệnh: print(allow_access(True, False, True, True)), kết quả là gì và tại sao kết quả này lại không đúng với luật ban đầu?",
    options: [
      "False – vì nhánh nhân viên trả về sớm (return False), làm cho điều kiện khách không bao giờ được kiểm tra đến.",
      "True – vì điều kiện khách có giấy mời vẫn được kiểm tra bình thường ở bên dưới.",
      "Lỗi runtime do thiếu khai báo kiểu dữ liệu cho các biến truyền vào.",
      "True – vì cả hai điều kiện rẽ nhánh hoạt động độc lập với nhau."
    ],
    correctAnswerIndex: 0,
    explanation: "Do gọi `allow_access(True, False, True, True)` với `is_employee = True`, chương trình rẽ vào nhánh `if is_employee`. Vì `has_card = False` nên nó lập tức `return False` và khép hàm, không chạy tiếp đến khối kiểm tra khách mời bên dưới."
  },
  {
    id: 1012,
    category: Category.DEBUGGING_TESTING,
    questionText: "Xét đoạn mã đánh giá điểm số sau:\n\ndef grade(score):\n    if score >= 90:\n        return \"A\"\n    elif score >= 75:\n        return \"B\"\n    elif score >= 60:\n        return \"C\"\n    else:\n        return \"D\"\n\nTập dữ liệu kiểm thử (test input) nào dưới đây đảm bảo bao phủ đầy đủ tất cả các nhánh (branch coverage - mỗi nhánh if/elif/else chạy ít nhất 1 lần)?",
    options: [
      "[90, 80, 75, 60]",
      "[89, 80, 74, 59]",
      "[60, 60, 60, 60]",
      "[100, 0]",
      "[95, 80, 65, 40]"
    ],
    correctAnswerIndex: 4,
    explanation: "Để đạt 100% Branch Coverage, tập test cần kích hoạt tất cả các nhánh đầu ra:\n- Nhánh `grade >= 90` -> Cần điểm chẵn như 95.\n- Nhánh `75 <= score < 90` -> Cần điểm 80.\n- Nhánh `60 <= score < 75` -> Cần điểm 65.\n- Nhánh `score < 60` -> Cần điểm 40.\nTập [95, 80, 65, 40] đáp ứng trọn vẹn yêu cầu này."
  },
  {
    id: 1013,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã Python sử dụng vòng lặp sau:\n\nnums = [2, 3, 5, 7, 11]\nres = 0\nfor i, v in enumerate(nums):\n    if i == 0:\n        continue\n    if v % nums[i-1] == 0:\n        res += 10\n    else:\n        res += (v - nums[i-1])\nprint(res)\n\nKết quả hiển thị sau khi chạy đoạn code là:",
    options: [
      "13",
      "11",
      "15",
      "9",
      "7"
    ],
    correctAnswerIndex: 3,
    explanation: "- i=0: bỏ qua.\n- i=1 (v=3): `v % nums[0]` là `3 % 2 != 0`. `res` tăng thêm `3 - 2 = 1` -> res = 1.\n- i=2 (v=5): `5 % 3 != 0`. `res` tăng `5 - 3 = 2` -> res = 3.\n- i=3 (v=7): `7 % 5 != 0`. `res` tăng `7 - 5 = 2` -> res = 5.\n- i=4 (v=11): `11 % 7 != 0`. `res` tăng `11 - 7 = 4` -> res = 9."
  },
  {
    id: 1014,
    category: Category.PYTHON_BASICS,
    questionText: "Trong đoạn mã sau, kết quả được in ra màn hình là gì?\n\ndef incr_list(nums):\n    for n in nums:\n        n = n + 1\n    return nums\n\nlst = [6, 0, 7]\nprint(incr_list(lst))",
    options: [
      "[6, 0, 7]",
      "Không in ra kết quả nào cả",
      "Chương trình báo lỗi thực thi (Runtime Error)",
      "[6, 0, 7, 1, 1, 1]",
      "[7, 1, 8]"
    ],
    correctAnswerIndex: 0,
    explanation: "Vòng lặp `for n in nums` gán bản sao giá trị phần tử vào biến cục bộ `n`. Phép cộng `n = n + 1` chỉ điều hướng lại tham chiếu của biến rời rạc này chứ không can thiệp hay sửa các phần tử nằm trong mảng `lst` ban đầu."
  },
  {
    id: 1015,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm range(2, 10, 3) trong Python sẽ sinh ra dãy số nào sau đây?",
    options: [
      "5, 8",
      "2, 5, 8",
      "2, 3, 4, 5, 6, 7, 8, 9",
      "2, 5, 8, 11"
    ],
    correctAnswerIndex: 1,
    explanation: "`range(start, stop, step)` sản sinh giá trị bắt đầu từ 2, tăng tiến thêm 3 đơn vị mỗi bước, cho tới cận dưới sát kề 10 (không gồm 10). Các giá trị gồm 2, 5, 8."
  },
  {
    id: 1016,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm xử lý chuỗi sau đây trả về kết quả gì?\n\ndata = 'a1b2c3d4'\nres = ''\nfor char in data:\n    if char.isdigit():\n        res += str(int(char) * 2)\n    else:\n        res += char.upper()\nprint(res)",
    options: [
      "a2b4c6d8",
      "A1B2C3D4",
      "ABCD",
      "A2B4C6D8"
    ],
    correctAnswerIndex: 3,
    explanation: "- Ký tự chữ cái ('a','b'...) tự nâng lên viết in hoa nhờ `.upper()`.\n- Ký tự số ('1','2'...) ép kiểu thành int nhân 2 rồi khép lại dạng string dán nối. Kết quả: 'A2B4C6D8'."
  },
  {
    id: 1017,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã Python định nghĩa giá trị mặc định cho tham số:\n\ndef add(x, L=[]):\n    if L is None:\n        L = []\n    L.append(x)\n    return L\n\nprint(add(1), add(2), add(3))",
    options: [
      "Lỗi cú pháp/thực thi",
      "[1] [1, 2] [1, 2, 3]",
      "[1] [2] [3]",
      "1 2 3",
      "[1, 2, 3] [1, 2, 3] [1, 2, 3]"
    ],
    correctAnswerIndex: 4,
    explanation: "Đối tượng mutable (list rỗng `[]`) đặt làm tham số mặc định chỉ khởi tạo duy nhất một lần khi nạp hàm. Do đó cả 3 lần gọi add đều sửa đổi và trả về cùng một tham chiếu của danh sách L tồn tại lâu dài này. Khi `print` in ra, nó phản ánh trạng thái cuối cùng của danh sách đó là `[1, 2, 3]` ba lần liên tiếp."
  },
  {
    id: 1018,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả in ra của vòng lặp sau là gì?\n\ns = 0\nfor i in range(1, 4):\n    s += i\nprint(s)",
    options: [
      "10",
      "6",
      "12",
      "3"
    ],
    correctAnswerIndex: 1,
    explanation: "`range(1, 4)` sinh ra dãy [1, 2, 3]. Quá trình tích lũy: s = 0 + 1 + 2 + 3 = 6."
  },
  {
    id: 1019,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau:\n\nnums = [6, 0, 7]\nfor n in nums:\n    n = n + 1\nprint(nums)",
    options: [
      "[6, 0, 7, 1]",
      "[7, 1, 8]",
      "[6, 0, 7]",
      "Báo lỗi vì không thể cộng trực tiếp số nguyên vào danh sách"
    ],
    correctAnswerIndex: 2,
    explanation: "Vòng lặp `for n in nums` sao chép giá trị từng phần tử vào biến cục bộ `n`. Hoạt động tăng số cộng nguyên `n = n + 1` không chỉnh sửa gì tới mảng gốc."
  },
  {
    id: 1020,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả sau khi thực hiện chương trình sau là gì?\n\nx = (i for i in range(3))\nfor i in x:\n    print(i)\nfor i in x:\n    print(i)",
    options: [
      "In ra dãy: 0, 1, 2 (mỗi số trên 1 dòng)",
      "Báo lỗi biên dịch",
      "In ra dãy: 0, 1, 2 rồi tiếp tục 0, 1, 2 (mỗi số trên 1 dòng)",
      "Chỉ in ra dãy 0, 1, 2 một lần vì đối tượng Generator đã bị cạn kiệt (exhausted)"
    ],
    correctAnswerIndex: 3,
    explanation: "Biểu thức `(i for i in range(3))` khởi tạo một Generator. Sau vòng lặp thứ nhất, generator đã duyệt hết toàn bộ giá trị và rơi vào trạng thái cạn kiệt (exhausted). Vòng lặp thứ hai không chạy do không còn phần tử nào."
  },
  {
    id: 1021,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã gán danh sách sau:\n\na = [1, 2, 3]\nb = a\na.append(4)\nprint(b)",
    options: [
      "[1, 2, 3, 4]",
      "[1, 2, 3]",
      "Chương trình báo lỗi",
      "[1, 2, 3, [4]]"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép gán `b = a` không nhân bản đối tượng danh sách mà chỉ gán tham chiếu bộ nhớ. Do đó, `a` và `b` trỏ cùng một danh sách trong memory, việc append 4 lên a thay đổi b tương ứng."
  },
  {
    id: 1022,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã Python sau:\n\ndef modify(lst):\n    lst = lst + [4]\n    return lst\n\na = [1, 2, 3]\nmodify(a)\nprint(a)",
    options: [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "Báo lỗi thực thi",
      "[4]"
    ],
    correctAnswerIndex: 0,
    explanation: "Trong hàm `modify`, phép toán `lst = lst + [4]` tạo ra danh sách hoàn toàn mới và gán cục bộ cho biến `lst`, không tác động thay đổi gì lên danh sách nguyên bản `a`."
  },
  {
    id: 1023,
    category: Category.PYTHON_BASICS,
    questionText: "Xét hàm làm thay đổi đối tượng có thể sửa đổi (Mutable Object):\n\ndef modify(lst):\n    lst.append(4)\n\na = [1, 2, 3]\nmodify(a)\nprint(a)",
    options: [
      "[1, 2, 3, 4]",
      "[1, 2, 3]",
      "Báo lỗi chương trình",
      "None"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `modify` sử dụng phương thức `append(4)` tác động trực tiếp thay đổi tại chỗ danh sách truyền vào thông qua tham chiếu gốc, do đó danh sách `a` bị biến đổi thêm số 4."
  },
  {
    id: 1024,
    category: Category.PYTHON_BASICS,
    questionText: "Cho cấu trúc dữ liệu từ điển: d = {\"apple\": 2, \"banana\": 3, \"cherry\": 5}. Lệnh nào sau đây dùng để lấy số lượng của khóa \"apple\"?",
    options: [
      "d[\"apple\"]",
      "d.get(\"apple\")",
      "Cả hai cách trên đều đúng",
      "Cả hai cách trên đều sai"
    ],
    correctAnswerIndex: 2,
    explanation: "Để tra cứu giá trị theo khóa trong dict, ta có thể dùng toán tử định vị ngoặc vuông `d[key]` hoặc phương thức an toàn `.get(key)`. Do đó cả hai phương thức đều đúng."
  },
  {
    id: 1025,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau:\n\nd = {\"apple\": 2, \"banana\": 3}\nd[\"orange\"] = 4\nprint(len(d))",
    options: [
      "3",
      "2",
      "4",
      "Chương trình báo lỗi"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép gán `d[\"orange\"] = 4` bổ sung thêm một cặp khóa-giá trị mới vào từ điển, làm kích thước từ điển từ 2 tăng lên 3."
  },
  {
    id: 1026,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức .get( ) của Dictionary hoạt động như thế nào trong đoạn mã sau?\n\nd = {\"apple\": 2, \"banana\": 3}\nprint(d.get(\"orange\", 0))",
    options: [
      "0",
      "None",
      "Chương trình báo lỗi KeyError",
      "3"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `d.get(key, default)` tìm khóa 'orange'. Vì không tồn tại khóa này, nó trả về giá trị mặc định được chỉ định ở tham số thứ hai là `0`, giúp né lỗi dừng hệ thống."
  },
  {
    id: 1027,
    category: Category.PYTHON_BASICS,
    questionText: "Cho hai cấu trúc dữ liệu Set (Tập hợp) như sau:\n\ns1 = {1, 2, 3}\ns2 = {3, 4, 5}\nprint(s1 & s2)",
    options: [
      "{3}",
      "set()",
      "{1, 2, 3, 4, 5}",
      "Báo lỗi không hỗ trợ toán tử"
    ],
    correctAnswerIndex: 0,
    explanation: "Toán tử `&` đại diện cho phép tính giao (intersection) giữa hai tập hợp, trả về một phân tập con chứa các phần tử chung của cả hai bên. Phần tử chung duy nhất là 3."
  },
  {
    id: 1028,
    category: Category.PYTHON_BASICS,
    questionText: "Cho biến chuỗi: s = \"Python Programming\". Lệnh cắt chuỗi s [0:6] sẽ trả về giá trị nào dưới đây?",
    options: [
      "\"Python\"",
      "\"Python \"",
      "\"Pytho\"",
      "\"Programming\""
    ],
    correctAnswerIndex: 0,
    explanation: "Cú pháp cắt chuỗi `s[start:end]` thu thập văn bản từ chỉ số 0 tới sát 6 (gồm các ký tự ở vị trí 0, 1, 2, 3, 4, 5 là 'P', 'y', 't', 'h', 'o', 'n')."
  },
  {
    id: 1029,
    category: Category.PYTHON_BASICS,
    questionText: "Lệnh s[-1] trên chuỗi s = \"Python\" sẽ trả về ký tự nào?",
    options: [
      "Ký tự 'n'",
      "Ký tự 'P'",
      "Ký tự 'o'",
      "Báo lỗi chỉ mục ngoài phạm vi (IndexError)"
    ],
    correctAnswerIndex: 0,
    explanation: "Chỉ mục âm `-1` trong Python đại diện cho ký tự cuối cùng từ đuôi đếm lên trong cấu trúc chuỗi hoặc danh sách. Ký tự cuối cùng của 'Python' là 'n'."
  },
  {
    id: 1030,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức nào trong Python dùng để chuyển đổi tất cả các ký tự trong một chuỗi thành dạng chữ in hoa?",
    options: [
      "upper()",
      "capitalize()",
      "uppercase()",
      "title()"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `.upper()` dùng để viết in hoa toàn bộ các ký tự của chuỗi. `.capitalize()` chỉ viết hoa chữ cái đầu và viết thường còn lại; `.title()` viết hoa chữ cái đầu tiên của mỗi từ."
  },
  {
    id: 1031,
    category: Category.PYTHON_BASICS,
    questionText: "Để tách một chuỗi thành một danh sách (list) các từ dựa trên khoảng trắng, ta sử dụng phương thức nào?",
    options: [
      "split()",
      "join()",
      "strip()",
      "replace()"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `.split()` mặc định tách một chuỗi dựa theo bất kỳ chuỗi khoảng trắng liền kề nhau nào và đóng gói chúng thành một List thuận tiện."
  },
  {
    id: 1032,
    category: Category.RECURSION_OOP,
    questionText: "Cho đoạn mã đệ quy tính tổng sau:\n\ndef solve(n):\n    if n == 1:\n        return 1\n    return n + solve(n - 1)\n\nprint(solve(4))",
    options: [
      "10",
      "24",
      "4",
      "1"
    ],
    correctAnswerIndex: 0,
    explanation: "Nguyên lý đệ quy tích lũy triển khai:\nsolve(4) = 4 + solve(3) = 4 + 3 + solve(2) = 4 + 3 + 2 + solve(1) = 4 + 3 + 2 + 1 = 10."
  },
  {
    id: 1033,
    category: Category.RECURSION_OOP,
    questionText: "Thiết kế đệ quy (Recursion) luôn bao gồm hai phần chính nào sau đây?",
    options: [
      "Trường hợp cơ sở (base case) và bước đệ quy (recursive step)",
      "Vòng lặp (for/while) và rẽ nhánh (if/else)",
      "Phương pháp thử và sai (trial and error)",
      "Khai báo biến toàn cục và định nghĩa hàm"
    ],
    correctAnswerIndex: 0,
    explanation: "Mọi hàm đệ quy đúng tiêu chuẩn luôn yêu cầu:\n- Trường hợp cơ sở (base case) để làm điểm dừng tránh lặp vô hạn gây lỗi.\n- Bước đệ quy (recursive step) gọi lại chính nó với không gian hẹp hơn để tiến về điểm dừng."
  },
  {
    id: 1034,
    category: Category.RECURSION_OOP,
    questionText: "Nếu một hàm đệ quy không có trường hợp cơ sở (base case), điều gì sẽ xảy ra khi thực thi?",
    options: [
      "Lỗi tràn bộ nhớ ngăn xếp hệ thống (RecursionError: maximum recursion depth exceeded)",
      "Chương trình vẫn chạy bình thường và tự ngắt ngẫu nhiên",
      "Hàm lập tức trả về giá trị None",
      "Tạo ra vòng lặp vô hạn mà không hề tốn dung lượng bộ nhớ"
    ],
    correctAnswerIndex: 0,
    explanation: "Không có điểm dừng của đệ quy, máy ảo Python liên tục bổ sung thêm các Record Frame vào bộ nhớ ngăn xếp cuộc gọi (Stack) cho đến khi kiệt quệ vùng nhớ này và ném lỗi `RecursionError`."
  },
  {
    id: 1035,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian tốt nhất (Best-case time complexity) của thuật toán Tìm kiếm tuyến tính (Linear Search) trên danh sách gồm n phần tử là:",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Trường hợp tốt nhất của tìm kiếm tuyến tính xảy ra khi phần tử cần tìm xuất hiện ngay vị trí đầu tiên của danh sách. Thao tác so sánh hoàn tất trong một bước thực thi tốn O(1)."
  },
  {
    id: 1036,
    category: Category.ALGORITHMS,
    questionText: "Để áp dụng thuật toán Tìm kiếm nhị phân (Binary Search), danh sách đầu vào bắt buộc phải thỏa mãn điều kiện tiên quyết nào?",
    options: [
      "Các phần tử đã được sắp xếp theo một thứ tự nhất định",
      "Danh sách không được phép chứa các phần tử trùng lặp",
      "Tất cả các phần tử phải thuộc kiểu số nguyên (int)",
      "Kích thước của danh sách phải là lũy thừa của 2"
    ],
    correctAnswerIndex: 0,
    explanation: "Bản chất tìm kiếm nhị phân chia đôi tìm kiếm thông qua quy luật toán học, nó chỉ chạy tin cậy khi các phần tử danh sách được sắp xếp theo thứ tự (tăng dần hoặc giảm dần)."
  },
  {
    id: 1037,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian trong trường hợp xấu nhất (Worst-case time complexity) của thuật toán Tìm kiếm nhị phân là:",
    options: [
      "O(log n)",
      "O(n)",
      "O(1)",
      "O(n log n)"
    ],
    correctAnswerIndex: 0,
    explanation: "Ở mỗi bước của Search nhị phân, không gian tìm kiếm bị thu hẹp đi một nửa. Chốt chặn xấu nhất sau k bước n/(2^k) = 1 cho thấy k lượng bước tương đương O(log n)."
  },
  {
    id: 1038,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trong xử lý ngoại lệ (Exception Handling) của Python, khối lệnh nào sẽ được thực thi khi xuất hiện lỗi xảy ra bên trong khối try?",
    options: [
      "except",
      "finally",
      "else",
      "catch"
    ],
    correctAnswerIndex: 0,
    explanation: "Khi lỗi nảy sinh trong lệnh try, luồng chạy lập tức ngắt ngang và định tuyến sang khối `except` phù hợp để hứng, cô lập sai sót bảo vệ chương trình."
  },
  {
    id: 1039,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khối lệnh nào sau đây trong cấu trúc try-except luôn luôn được thực thi dù cho có lỗi xảy ra hay không?",
    options: [
      "finally",
      "except",
      "else",
      "try"
    ],
    correctAnswerIndex: 0,
    explanation: "Khối `finally` đóng vai trò là một chốt dọn dẹp tối cao, luôn được bảo đảm thi hành cuối cùng sau mọi luồng của try hay except để đóng cổng kết nối, giải phóng tệp tin."
  },
  {
    id: 1040,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã xử lý đa ngoại lệ sau:\n\ntry:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"Division by zero\")\nexcept:\n    print(\"Some other error\")\n\nChương trình sẽ in ra gì?",
    options: [
      "Division by zero",
      "Some other error",
      "Chương trình crash và báo lỗi hệ thống",
      "Không in ra bất cứ nội dung gì"
    ],
    correctAnswerIndex: 0,
    explanation: "Phép toán `1 / 0` kích hoạt trực tiếp lỗi `ZeroDivisionError`. Python rẽ nhánh vào khối except đầu tiên chỉ định riêng biệt cho lỗi này và in ra 'Division by zero'."
  },
  {
    id: 1041,
    category: Category.RECURSION_OOP,
    questionText: "Trong Lập trình hướng đối tượng (OOP) bằng Python, lớp (class) được hiểu là gì?",
    options: [
      "Một bản thiết kế mẫu (blueprint) dùng để kiến tạo nên các đối tượng (objects) cụ thể",
      "Một kiểu dữ liệu danh sách nâng cao để lưu trữ các phần tử",
      "Một hàm đặc biệt dùng để tính toán các biểu thức logic phức tạp",
      "Một thư viện/module có sẵn trong nhân lõi của ngôn ngữ Python"
    ],
    correctAnswerIndex: 0,
    explanation: "Trong mô hình OOP, lớp (Class) là một bộ khuôn/bản thiết kế mô tả thuộc tính và hành vi chung để từ đó xây dựng các thực thể đối tượng cụ thể (Instance)."
  },
  {
    id: 1042,
    category: Category.RECURSION_OOP,
    questionText: "Cú pháp chuẩn xác nào dùng để tạo ra một đối tượng từ lớp MyClass?",
    options: [
      "obj = MyClass()",
      "obj = new MyClass()",
      "obj = MyClass.create()",
      "obj = call MyClass"
    ],
    correctAnswerIndex: 0,
    explanation: "Để khởi tạo đối tượng từ một Class trong Python, ta chỉ cần gọi tên lớp kế hợp dấu ngoặc tròn `MyClass()`. Tránh việc lạm dụng từ khóa `new` vốn không có ở Python."
  },
  {
    id: 1043,
    category: Category.RECURSION_OOP,
    questionText: "Phương thức đặc biệt __init__ trong một lớp Python đóng vai trò gì?",
    options: [
      "Là phương thức khởi tạo (constructor) dùng để thiết lập giá trị ban đầu cho đối tượng khi được tạo ra",
      "Là phương thức hủy giải phóng bộ nhớ của đối tượng",
      "Là phương thức đặc biệt chuyên dùng để hiển thị thông tin đối tượng",
      "Là phương thức dùng để nhân bản đối tượng hiện tại"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `__init__` đóng vai trò là một hàm cấu tử (constructor) khởi tạo, tự kích hoạt khi đối tượng tượng sinh để ấn định các trị dữ liệu ban đầu cho các biến thành viên."
  },
  {
    id: 1044,
    category: Category.RECURSION_OOP,
    questionText: "Từ khóa tham chiếu self trong định nghĩa phương thức của lớp đại diện cho:",
    options: [
      "Chính thực thể đối tượng hiện tại đang thực thi phương thức đó",
      "Lớp cha trực tiếp của lớp hiện hành",
      "Hàm bao ngoài chứa toàn bộ khối định nghĩa lớp đó",
      "Một biến phạm vi toàn cục của chương trình"
    ],
    correctAnswerIndex: 0,
    explanation: "Tham số `self` trỏ tham chiếu đến chính thực thể đối tượng đang gọi phương thức, cho phép truy cập, sửa đổi thuộc tính cụ thể riêng tư của đối tượng đó."
  },
  {
    id: 1045,
    category: Category.RECURSION_OOP,
    questionText: "Cho đoạn mã định nghĩa lớp đơn giản sau:\n\nclass Cat:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return \"Meow\"\n\nc = Cat(\"Kitty\")\nprint(c.speak())\n\nChương trình sẽ in ra gì?",
    options: [
      "Meow",
      "Kitty",
      "Báo lỗi biên dịch do thiếu tham số self khi gọi hàm",
      "Cat"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `.speak()` của đối tượng Cat trả về chuỗi kí tự 'Meow'. print hiển thị nó lành mạnh lên màn hình."
  },
  {
    id: 1046,
    category: Category.FILES_LIBRARIES,
    questionText: "Hàm/Phương thức nào dùng để thực hiện ghi trực tiếp nội dung chuỗi vào một tệp tin (file) đang mở ở chế độ 'w'?",
    options: [
      "write()",
      "print()",
      "read()",
      "input()"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm `file.write(string)` dùng để ghi trực tiếp toàn bộ chuỗi văn bản vào file đích."
  },
  {
    id: 1047,
    category: Category.FILES_LIBRARIES,
    questionText: "Cú pháp đúng để mở một file có tên 'data.txt' nhằm mục đích ghi tiếp (append) dữ liệu vào cuối tệp tin là:",
    options: [
      "open('data.txt', 'a')",
      "open('data.txt', 'w')",
      "open('data.txt', 'r')",
      "open('data.txt', 'x')"
    ],
    correctAnswerIndex: 0,
    explanation: "Chế độ `'a'` (append) mở file để viết dữ liệu tiếp nối vào điểm cuối tệp hiện tại thay vì xóa đè đi như chế độ `'w'`."
  },
  {
    id: 1048,
    category: Category.FILES_LIBRARIES,
    questionText: "Ý nghĩa và vai trò chính của phương thức close( ) trên một đối tượng tệp tin là gì?",
    options: [
      "Đóng tệp tin lại và giải phóng tài nguyên hệ thống đã cấp phát",
      "Xóa hoàn toàn tệp tin khỏi ổ đĩa lưu trữ",
      "Lưu lại nội dung hiện tại và tiếp tục cho phép ghi luồng dữ liệu mới",
      "Khởi động lại tệp tin ở một chế độ làm việc mới"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức `.close()` ngắt liên kết lưu trữ để bộ điều hành cam kết ghi nốt dữ liệu còn tạm ở buffer vào ổ, đồng thời giải phóng tay nắm khóa file phục vụ tiến trình khác."
  },
  {
    id: 1049,
    category: Category.FILES_LIBRARIES,
    questionText: "Đoạn mã Python sử dụng từ khóa with dưới đây đem lại lợi ích gì nổi bật nhất?\n\nwith open('test.txt', 'r') as f:\n    content = f.read()",
    options: [
      "Mở tệp tin và tự động đóng tệp tin an toàn sau khi kết thúc khối lệnh đọc dữ liệu",
      "Giúp tệp tin luôn mở mà không bao giờ đóng",
      "Chỉ cho phép mở tệp tin nếu tệp tin đó đang có dữ liệu",
      "Báo lỗi tức thì nếu tệp tin đang trống"
    ],
    correctAnswerIndex: 0,
    explanation: "Từ khóa `with` hoạt động như một Context Manager, tự động dọn dẹp đóng tệp tin tin cậy đằng sau hậu trường khi khối mã hoàn tất kể cả việc có lỗi ngoại lệ đột ngột phát sinh."
  },
  {
    id: 1050,
    category: Category.FILES_LIBRARIES,
    questionText: "Cho đoạn mã sử dụng hàm bậc cao map( ) sau:\n\ndef double(x):\n    return x * 2\n\nnums = [1, 2, 3]\nres = list(map(double, nums))\nprint(res)\n\nChương trình sẽ in ra màn hình kết quả nào?",
    options: [
      "[2, 4, 6]",
      "[1, 2, 3, 1, 2, 3]",
      "[1, 4, 9]",
      "Báo lỗi kiểu dữ liệu không khớp"
    ],
    correctAnswerIndex: 0,
    explanation: "`map(function, iterable)` duyệt từng hạt tử trong nums truyền làm tham số cho hàm double, chuyển biến đầu ra gom lại. Kết quả biến đổi [1,2,3] thành [2,4,6]."
  }
];

export const oetFinalExamCa1: Question[] = rawOetFinalExamCa1.map((q) => {
  if (q.category === Category.PYTHON_BASICS) {
    return {
      ...q,
      category: getDetailedPythonCategory(q)
    };
  }
  return q;
});

// Generate a deterministic 100-question pool from oetFinalExamCa1 and classic quizQuestions
const htmlQuestionBank: Question[] = [
  ...oetFinalExamCa1.map((q, index) => ({ ...q, id: index + 1 })),
  ...quizQuestions.slice(0, 50).map((q, index) => ({ ...q, id: 50 + index + 1 }))
];

function getDeterministicSubList(list: Question[], count: number, offset: number): Question[] {
  const subList: Question[] = [];
  for (let j = 0; j < list.length; j++) {
    const idx = (offset + j * 13) % list.length;
    if (!subList.includes(list[idx])) {
      subList.push(list[idx]);
    }
    if (subList.length >= count) break;
  }
  return subList;
}

const generated10Exams: PresetExam[] = [];

for (let i = 1; i <= 10; i++) {
  const group1 = htmlQuestionBank.filter((q) => q.id <= 25);
  const group2 = htmlQuestionBank.filter((q) => q.id > 25 && q.id <= 50);
  const group3 = htmlQuestionBank.filter((q) => q.id > 50 && q.id <= 75);
  const group4 = htmlQuestionBank.filter((q) => q.id > 75);

  const seed = i;
  const part1 = getDeterministicSubList(group1, 13, seed * 5);
  const part2 = getDeterministicSubList(group2, 12, seed * 7);
  const part3 = getDeterministicSubList(group3, 13, seed * 9);
  const part4 = getDeterministicSubList(group4, 12, seed * 11);

  const combined = [...part1, ...part2, ...part3, ...part4];

  // Guarantee exactly 50 questions
  while (combined.length < 50) {
    const randomQ = htmlQuestionBank[Math.floor(Math.random() * htmlQuestionBank.length)];
    if (!combined.includes(randomQ)) {
      combined.push(randomQ);
    }
  }

  generated10Exams.push({
    id: `oet_generated_exam_de_${i}`,
    title: `Đề thi số 0${i} (Bộ môn Tư duy tính toán)`,
    description: `Đề thi thử chính thức số 0${i} được thiết kế cân đối từ các chuyên mục câu hỏi kiểm tra khách quan.`,
    timeLimitMinutes: 60,
    questions: combined.slice(0, 50)
  });
}

export const presetExamsList: PresetExam[] = [
  {
    id: "oet_final_exam_01",
    title: "[COMP1050] Đề thi chính thức số 1 - Bộ môn Tư duy tính toán",
    description: "Đề thi trắc nghiệm khách quan chính thức từ bộ môn Tư duy tính toán (COMP1050) - Trường Đại học Công nghệ (VNU-UET). Bộ đề gồm 50 câu hỏi chuẩn hóa được số hóa trọn vẹn từ tài liệu ôn tập 'bai_tap (3) (1).pdf'.",
    timeLimitMinutes: 60,
    questions: oetFinalExamCa1
  },
  {
    id: "oet_final_official_exam",
    title: "Bài kiểm tra cuối kỳ (50 câu - 60 phút)",
    description: "Đề thi chính thức cuối kỳ bộ môn Tư duy tính toán. Gồm 50 câu hỏi làm bài trong vòng 60 phút nhằm kiểm nghiệm toàn bộc vốn hiểu biết lập trình Python và CT.",
    timeLimitMinutes: 60,
    questions: oetFinalExamCa1
  },
  {
    id: "oet_midterm_exam_practice",
    title: "[COMP1050] Đề luyện tập giữa kỳ - Bộ môn Tư duy tính toán",
    description: "Bộ câu hỏi luyện tập rút gọn (20 câu hỏi) từ ngân hàng đề thi chính thức của môn học, giúp sinh viên làm quen nhanh với cấu trúc đề và các đoạn code trắc nghiệm.",
    timeLimitMinutes: 30,
    questions: oetFinalExamCa1.slice(0, 20) // subset for practice
  },
  ...generated10Exams
];
