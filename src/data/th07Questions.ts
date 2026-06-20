import { Question, Category } from "../types";

export const th07Questions: Question[] = [
  {
    id: 7001,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Đoạn code sau in ra gì?",
    codeSnippet: "d = {\"a\": 1, \"b\": 2}\nd[\"a\"] = d[\"a\"] + d[\"b\"]\nprint(d[\"a\"])",
    options: [
      "A. 1",
      "B. 3",
      "C. Lỗi vì dictionary không cộng được",
      "D. 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Phép toán d['a'] + d['b'] truy xuất giá trị tương ứng là 1 + 2 = 3. Giá trị sau đó được gán ngược lại cho khóa 'a' trong từ điển d. d['a'] lúc này bằng 3."
  },
  {
    id: 7002,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Kết quả của đoạn code sau là gì?",
    codeSnippet: "s = {1, 2, 3}\nt = {3, 4}\nprint(s & t)",
    options: [
      "A. {1, 2, 3, 4}",
      "B. {1, 2, 4}",
      "C. {3}",
      "D. Lỗi cú pháp"
    ],
    correctAnswerIndex: 2,
    explanation: "Toán tử '&' thực hiện phép giao (intersection) giữa hai tập hợp (set). Kết quả trả về là một tập hợp chứa các phần tử chung có mặt ở cả hai set, ở đây là {3}."
  },
  {
    id: 7003,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho danh sách: lst = [10, 20, 30, 40, 50]. Thực hiện các lệnh sau và tìm danh sách cuối cùng:\nlst.pop(1)\nlst.insert(2, 99)\nlst.remove(50)\nprint(lst)",
    codeSnippet: "lst = [10, 20, 30, 40, 50]\nlst.pop(1)\nlst.insert(2, 99)\nlst.remove(50)\nprint(lst)",
    options: [
      "A. [10, 30, 40, 99]",
      "B. [10, 30, 99, 40]",
      "C. [10, 20, 99, 40]",
      "D. [10, 99, 30, 40]"
    ],
    correctAnswerIndex: 1,
    explanation: "1) lst.pop(1) xóa phần tử tại chỉ mục 1 (giá trị 20) -> lst = [10, 30, 40, 50].\n2) lst.insert(2, 99) chèn giá trị 99 vào chỉ mục 2 -> lst = [10, 30, 99, 40, 50].\n3) lst.remove(50) xóa phần tử có giá trị 50 -> lst = [10, 30, 99, 40]."
  },
  {
    id: 7004,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Kỹ thuật Slicing Assignment (gán lát cắt) sau đây hoạt động thế nào?",
    codeSnippet: "nums = [0, 1, 2, 3, 4, 5]\nnums[1:4] = [8, 9]\nprint(len(nums), nums)",
    options: [
      "A. 6, [0, 8, 9, None, 4, 5]",
      "B. Báo lỗi ValueError",
      "C. 6, [0, 8, 9, 3, 4, 5]",
      "D. 5, [0, 8, 9, 4, 5]"
    ],
    correctAnswerIndex: 3,
    explanation: "Lát gán nums[1:4] chỉ định thay thế dãy phần tử từ chỉ mục 1 đến 3 (tức [1, 2, 3]) bằng list mới [8, 9]. Do đó, dãy [1, 2, 3] biến thành [8, 9]. Chiều dài danh sách giảm từ 6 xuống 5, kết quả là: 5, [0, 8, 9, 4, 5]."
  },
  {
    id: 7005,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Đoạn mã sau đếm số lần xuất hiện ký tự. Đầu ra in ra màn hình là gì?",
    codeSnippet: "text = 'hello'\nd = {}\nfor c in text:\n    d[c] = d.get(c, 0) + 1\nprint(d['l'] + d.get('z', 10))",
    options: [
      "A. 2",
      "B. 12",
      "C. Error",
      "D. 10"
    ],
    correctAnswerIndex: 1,
    explanation: "Vòng lặp đếm tần suất xuất hiện ký tự trong 'hello'. 'l' xuất hiện 2 lần -> d['l'] = 2. Ký tự 'z' không tồn tại trong từ điển, vì thế d.get('z', 10) trả về giá trị mặc định là 10. Tổng là 2 + 10 = 12."
  },
  {
    id: 7006,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Biểu thức List Comprehension có điều kiện sau cho ra kết quả là gì?",
    codeSnippet: "vals = [10, -5, 20, -1, 0, 30]\nres = [x if x > 0 else 0 for x in vals]\nprint(res)",
    options: [
      "A. [10, 20, 0, 0, 0, 30]",
      "B. [10, 20, 30]",
      "C. [10, 0, 20, 0, 0, 30]",
      "D. [10, -5, 20, -1, 0, 30]"
    ],
    correctAnswerIndex: 2,
    explanation: "Biểu thức lặp qua vals: nếu phần tử x > 0 thì giữ nguyên x, ngược lại gán bằng 0. Với các số -5, -1 và 0, điều kiện x > 0 bị vi phạm nên chúng được chuyển thành 0. Kết quả là [10, 0, 20, 0, 0, 30]."
  },
  {
    id: 7007,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Nested List Comprehension (vòng lặp lồng nhau) để làm phẳng (flatten) ma trận sau đây sẽ in ra kết quả gì?",
    codeSnippet: "matrix = [[1, 2], [3, 4], [5, 6]]\nflat = [num for row in matrix for num in row]\nprint(flat[3])",
    options: [
      "A. 4",
      "B. 3",
      "C. 5",
      "D. 2"
    ],
    correctAnswerIndex: 0,
    explanation: "Cú pháp [num for row in matrix for num in row] tương đương với lặp qua từng hàng 'row', rồi lặp qua từng số 'num' trong hàng đó. Danh sách phẳng flat thu được là [1, 2, 3, 4, 5, 6]. Chỉ mục flat[3] là 4."
  },
  {
    id: 7008,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Một quy tắc cơ bản về key (khóa) trong dictionary của Python là gì?",
    options: [
      "A. Key bắt buộc phải là chuỗi (string).",
      "B. Key phải duy nhất và thuộc kiểu bất biến (có thể băm / hashable).",
      "C. Key không cần duy nhất miễn là value khác nhau.",
      "D. Key có thể là mọi kiểu dữ liệu, kể cả list."
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python, mọi key trong từ điển (dictionary) phải là duy nhất để tránh xung đột dữ liệu, và bắt buộc thuộc kiểu dữ liệu bất biến (immutable/hashable) để hệ thống tính giá trị băm nhằm tìm kiếm tối ưu trong O(1)."
  },
  {
    id: 7009,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho đoạn mã python sau, kết quả sau khi chạy là gì?",
    codeSnippet: "a = [1, 2, 3, 4]\na[1:3] = [9]\nprint(a)",
    options: [
      "A. [1, 9, 4]",
      "B. [1, 9]",
      "C. ValueError",
      "D. [1, 9, 3, 4]"
    ],
    correctAnswerIndex: 0,
    explanation: "Cách cắt lát a[1:3] chọn các phần tử từ chỉ mục 1 đến sát chỉ mục 3 (tức [2, 3]). Phép gán thay thế dãy [2, 3] này bằng giá trị [9], làm mảng co ngắn lại thành [1, 9, 4]."
  },
  {
    id: 7010,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho đoạn mã python sau, kết quả sau khi chạy là gì?",
    codeSnippet: "d = {\"a\": 1, \"b\": 2}\nd.update({\"b\": 9, \"c\": 0})\nprint(d[\"b\"], \"c\" in d)",
    options: [
      "A. 2 False",
      "B. 9 False",
      "C. 9 True",
      "D. 2 True"
    ],
    correctAnswerIndex: 2,
    explanation: "Phương thức d.update(...) cập nhật giá trị cho khóa đã có bằng giá trị mới, đồng thời thêm mới các khóa chưa tồn tại. Khóa 'b' được đổi thành 9, và khóa 'c': 0 được thêm vào d. Cụm d['b'] = 9 và 'c' in d = True."
  },
  {
    id: 7011,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Quan sát đoạn mã nguồn dưới đây về việc thao tác trên Danh sách (List). Giá trị của biến list_a được in ra màn hình là gì?",
    codeSnippet: "list_a = [1, 2, 3]\nlist_b = list_a\nlist_c = list_a[:]\n\nlist_b.append(4)\nlist_c[0] = 99\n\nprint(list_a)",
    options: [
      "A. [99, 2, 3, 4]",
      "B. [1, 2, 3]",
      "C. Chương trình báo lỗi ở dòng list_a[:]",
      "D. [1, 2, 3, 4]"
    ],
    correctAnswerIndex: 3,
    explanation: "list_b và list_a cùng tham chiếu tới một danh sách duy nhất. list_c là một bản sao nông độc lập thông qua cú pháp slicing list_a[:]. Khi cập nhật list_c[0] = 99, list_a hoàn toàn không bị ảnh hưởng. Khi append(4) vào list_b, list_a nhận giá trị mới là [1, 2, 3, 4]."
  },
  {
    id: 7012,
    category: Category.DEBUGGING_TESTING,
    questionText: "Kết quả khi thực thi đoạn mã này là gì?",
    codeSnippet: "counts = {\"apple\": 1, \"banana\": 2}\ntry:\n    for fruit in counts:\n        if counts[fruit] > 1:\n            counts[\"orange\"] = 3\n        else:\n            counts[fruit] += 1\n    print(len(counts))\nexcept Exception as e:\n    print(type(e).__name__)",
    options: [
      "A. KeyError",
      "B. RuntimeError",
      "C. SyntaxError",
      "D. In ra 3"
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python 3, việc duyệt vòng lặp trên từ điển (counts) đồng thời làm thay đổi kích thước của từ điển đó (như thêm khóa mới 'orange') là không hợp lệ và sẽ ném lỗi RuntimeError: dictionary changed size during iteration."
  },
  {
    id: 7013,
    category: Category.DEBUGGING_TESTING,
    questionText: "Đoạn mã nguồn sau đây sẽ in ra kết quả nào? (Hiệu ứng lề trong tuple chứa danh sách khả biến)",
    codeSnippet: "data = (10, [20, 30])\ntry:\n    data[1].append(40)\n    data[1] += [50]\nexcept TypeError:\n    print(\"Error Occurred\", end=\" - \")\nprint(data)",
    options: [
      "A. (10, [20, 30, 40, 50])",
      "B. Error Occurred - (10, [20, 30])",
      "C. Error Occurred - (10, [20, 30, 40])",
      "D. Error Occurred - (10, [20, 30, 40, 50])"
    ],
    correctAnswerIndex: 3,
    explanation: "1) data[1].append(40) thành công bình thường. \n2) data[1] += [50] gọi phương thức __iadd__ sửa tại chỗ list bên trong thành [20, 30, 40, 50], sau đó gán ngược kết quả dán lại cho data[1]. Do tuple bất biến nên phép gán dính TypeError. Tuy nhiên, trước khi phát lỗi, list đã bị thay đổi dữ liệu tại chỗ. Kết quả in ra là 'Error Occurred - (10, [20, 30, 40, 50])'."
  },
  {
    id: 7014,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho đoạn mã sau, chương trình in ra gì?",
    codeSnippet: "d = {\"a\": 1, \"b\": 2}\nx = d.get(\"c\", 0)\nd[\"c\"] = x + 5\nd[\"b\"] = d.get(\"b\") + d.get(\"a\", 0)\nprint(d[\"a\"], d[\"b\"], d[\"c\"])",
    options: [
      "A. 1 2 5",
      "B. Báo lỗi vì \"c\" chưa tồn tại trong dict",
      "C. 1 3 0",
      "D. 1 3 5"
    ],
    correctAnswerIndex: 3,
    explanation: "1) d.get('c', 0) trả về 0 do khóa 'c' chưa có -> x = 0. \n2) d['c'] = 0 + 5 = 5. \n3) d.get('b') là 2, d.get('a', 0) là 1 -> d['b'] = 2 + 1 = 3. \n4) Kết quả sau cùng in ra d['a'], d['b'], d['c'] là: 1 3 5."
  },
  {
    id: 7015,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Đoạn mã Python sau sẽ cho ra kết quả gì? (Tính tập hợp set)",
    codeSnippet: "z = set('abc')\nz.add('san')\nz.update(set(['p', 'q']))\n# Xét xem phần tử xuất hiện trong tập hợp:",
    options: [
      "A. Gồm các phần tử rời rạc: 'a', 'b', 'c', 'p', 'q' và chữ nguyên bản 'san'",
      "B. Gồm các chữ cái của 'abc', 'san', 'p', 'q' bị rã ra rời rạc tự do",
      "C. Lỗi TypeError do không thể thêm danh sách lồng",
      "D. Gồm duy nhất các chữ cái gốc và chuỗi rỗng"
    ],
    correctAnswerIndex: 0,
    explanation: "z ban đầu được dựng từ set('abc') => {'a', 'b', 'c'}. Phương thức z.add('san') thêm nguyên chuỗi bất biến 'san' làm 1 phần tử mới. z.update(set(['p', 'q'])) hợp nhất các phần tử đơn lẻ 'p', 'q' vào set. Do đó các phần tử độc nhất gồm 'a', 'b', 'c', 'san', 'p', 'q'."
  },
  {
    id: 7016,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Kết quả thực hiện đoạn mã sau là gì?",
    codeSnippet: "total = {}\ndef insert(items):\n    if items in total:\n        total[items] += 1\n    else:\n        total[items] = 1\n\ninsert('Apple')\ninsert('Ball')\ninsert('Apple')\nprint(len(total))",
    options: [
      "A. 3",
      "B. 1",
      "C. 0",
      "D. 2"
    ],
    correctAnswerIndex: 3,
    explanation: "Mỗi khi gọi insert(item), nếu item chưa là khóa trong dictionary, nó được thêm làm khóa mới với giá trị khởi tạo bằng 1. 'Apple' được thêm, 'Ball' được thêm. Lần gọi 'Apple' thứ 2 chỉ thay đổi giá trị đếm thành 2. Chiều dài len(total) hiển thị số khóa độc nhất, bằng 2."
  },
  {
    id: 7017,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Đâu là output đoạn mã chương trình sau?",
    codeSnippet: "numbers = {}\nletters = {}\ncomb = {}\nnumbers[1] = 56\nnumbers[3] = 7\nletters[4] = 'B'\ncomb['Numbers'] = numbers\ncomb['Letters'] = letters\nprint(comb)",
    options: [
      "A. 'Numbers': {1: 56, 3: 7}",
      "B. Chương trình báo lỗi",
      "C. {'Numbers': {1: 56, 3: 7}, 'Letters': {4: 'B'}}",
      "D. {'Numbers': {1: 56}, 'Letters': {4: 'B'}}"
    ],
    correctAnswerIndex: 2,
    explanation: "Từ điển comb chứa hai khóa con: 'Numbers' tham chiếu trực tiếp đến từ điển numbers ({1: 56, 3: 7}) và 'Letters' tham chiếu trực tiếp đến letters ({4: 'B'}). In comb sẽ hiển thị đầy đủ cấu trúc lồng này."
  },
  {
    id: 7018,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho danh sách: my_list = [10, 20, 30, 40, 50]. Cách nào sau đây sẽ lấy ra được đoạn [20, 30, 40]?",
    options: [
      "A. my_list[1:3]",
      "B. my_list[1:4]",
      "C. my_list[1:-2]",
      "D. my_list[2:5]"
    ],
    correctAnswerIndex: 1,
    explanation: "Cú pháp slicing slice [start:stop] trích xuất mảng con từ chỉ mục start đến stop-1. my_list[1:4] trích xuất các phần tử ở các chỉ mục 1, 2, 3 lần lượt tương ứng là 20, 30, 40."
  },
  {
    id: 7019,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Giả sử d = {'a': 1, 'b': 2}. Cách nào sau đây sẽ cập nhật giá trị của 'a' lên thành 10?",
    options: [
      "A. d.set('a', 10)",
      "B. d.add('a', 10)",
      "C. d.update('a': 10)",
      "D. d['a'] = 10"
    ],
    correctAnswerIndex: 3,
    explanation: "Phép gán trực tiếp thông qua d['a'] = 10 là cú pháp chuẩn trong Python để cập nhật giá trị cho một khóa đã có trong từ điển. set() và add() không phải là hàm của lớp dictionary trong Python."
  },
  {
    id: 7020,
    category: Category.DEBUGGING_TESTING,
    questionText: "Yêu cầu: Lưu các giá trị duy nhất từ danh sách vào một set. Xét đoạn mã sau, kết quả in ra là gì?",
    codeSnippet: "numbers = [1, 2, 2, 3, 4]\nunique_numbers = set()\ntry:\n    for n in numbers:\n        unique_numbers.append(n)\n    print(unique_numbers)\nexcept Exception as e:\n    print(type(e).__name__)",
    options: [
      "A. AttributeError",
      "B. TypeError",
      "C. {1, 2, 3, 4}",
      "D. set()"
    ],
    correctAnswerIndex: 0,
    explanation: "Mặc dù set là tập hợp chứa các phần tử không lặp lại, nó chỉ hỗ trợ phương thức add() để thêm phần tử mới chứ không có phương thức append() giống như list. Gọi append() trên đối tượng set sẽ ném lỗi AttributeError."
  },
  {
    id: 7021,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho cấu trúc dữ liệu lưu trữ thông tin lớp học như sau. Câu lệnh nào sau đây dùng để lấy tên sinh viên thứ 2 trong lớp Tư Duy Tính Toán ('Binh')?",
    codeSnippet: "classes = {\n    'COM1050': {\n        'name': 'Tu Duy Tinh Toan',\n        'students': ['An', 'Binh']\n    },\n    'MAT1042': {\n        'name': 'Giai Tich 2',\n        'students': ['Chi', 'Dung']\n    }\n}",
    options: [
      "A. classes[name='Tu Duy Tinh Toan']['students'][1]",
      "B. classes['COM1050']['students'][1]",
      "C. classes['COM1050']['students']['Binh']",
      "D. classes['Tu Duy Tinh Toan']['students'][1]"
    ],
    correctAnswerIndex: 1,
    explanation: "Đầu tiên, dùng classes['COM1050'] để truy cập vào từ điển chứa thông tin lớp 'COM1050'. Sau đó, lấy khóa ['students'] (một list chứa tên các học sinh). Cuối cùng dùng index [1] để lấy ra sinh viên thứ 2 là 'Binh'."
  },
  {
    id: 7022,
    category: Category.PYTHON_FUNCTIONS,
    questionText: "Kết quả in ra màn hình của đoạn code sau là gì? (Chú ý tác hại gán lại biến cục bộ trong hàm)",
    codeSnippet: "def update_record(rec):\n    rec['status'] = 'Active'\n    rec = {'id': 99, 'status': 'Pending'}\n    rec['status'] = 'Closed'\n\nmy_record = {'id': 1}\nupdate_record(my_record)\nprint(my_record.get('status'))",
    options: [
      "A. Pending",
      "B. None",
      "C. Closed",
      "D. Active"
    ],
    correctAnswerIndex: 3,
    explanation: "Hàm update_record được truyền tham chiếu của my_record. Lệnh rec['status'] = 'Active' sửa đổi trực tiếp đối tượng gốc. Tuy nhiên, lệnh gán tiếp theo rec = {...} gán lại địa chỉ cục bộ của rec sang từ điển khác trong bộ nhớ, làm đứt gãy kết nối với đối tượng ban đầu. Vì thế lệnh rec['status'] = 'Closed' chỉ sửa đổi trên dict mới kia. my_record giữ nguyên trạng thái 'Active'."
  },
  {
    id: 7023,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Cho đoạn mã sau, chương trình in ra gì?",
    codeSnippet: "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 0))",
    options: [
      "A. Báo lỗi KeyError",
      "B. \"c\"",
      "C. Báo lỗi TypeError",
      "D. 0"
    ],
    correctAnswerIndex: 3,
    explanation: "Phương thức d.get(key, default) dùng để lấy giá trị ứng với khóa 'key' an toàn. Do khóa 'c' không tồn tại trong từ điển, Python trả về giá trị mặc định được chỉ định ở tham số thứ 2, là 0."
  },
  {
    id: 7024,
    category: Category.PYTHON_COLLECTIONS,
    questionText: "Kết quả của đoạn mã sau là gì?",
    codeSnippet: "data = {\"apple\": 5, \"orange\": 10}\ndata[\"apple\"] = 8\ndata[\"banana\"] = 12\nprint(len(data))",
    options: [
      "A. 25",
      "B. 3",
      "C. Chương trình báo lỗi",
      "D. 2"
    ],
    correctAnswerIndex: 1,
    explanation: "Khóa 'apple' ban đầu có giá trị 5, lệnh data['apple'] = 8 chỉ cập nhật giá trị mới cho khóa đó (không thêm mới). Lệnh data['banana'] = 12 thêm mới một cặp khóa-giá trị. Từ điển cuối cùng có 3 phần tử: 'apple', 'orange', 'banana'."
  }
];
