/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, Category } from "../types";
import { new100QuizQuestions } from "./newQuestions";
import { newOet100Questions } from "./newOetQuestions";
import { th07Questions } from "./th07Questions";
import { th012th13Questions } from "./th012th13Questions";
import { moreThQuestions } from "./moreThQuestions";

const initialQuestions: Question[] = [
  {
    id: 1,
    category: Category.PYTHON_BASICS,
    questionText: "Hàm sau trả về giá trị gì khi được gọi?",
    codeSnippet: "def f():\n    return 1, 2",
    options: [
      "A. 1",
      "B. 2",
      "C. (1, 2)",
      "D. [1, 2]",
    ],
    correctAnswerIndex: 2,
    explanation: "Trong Python, khi sử dụng câu lệnh return và phân tách các giá trị bằng dấu phẩy mà không có ngoặc, Python sẽ tự động đóng gói chúng thành một cấu trúc bộ dữ liệu kiêm bất biến gọi là Tuple. Do đó f() trả về bộ (1, 2)."
  },
  {
    id: 2,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trường hợp nào sau đây là một 'edge case' (trường hợp biên) tốt nhất khi tiến hành kiểm thử cho hàm tính trị tuyệt đối abs(x)?",
    options: [
      "A. x = 0",
      "B. x = 2",
      "C. x = 10",
      "D. x = 100",
    ],
    correctAnswerIndex: 0,
    explanation: "Với hàm tính trị tuyệt đối `abs(x)`, thuật toán xử lý phân nhánh dựa trên ranh giới số âm và số dương. Số 0 chính là ranh giới giao nhau nhạy cảm của miền xác định (nơi hành vi hàm chuyển trạng thái). Do đó, x = 0 là một trường hợp biên (edge case) hoàn hảo để kiểm tra sự hoạt động tin cậy."
  },
  {
    id: 3,
    category: Category.PYTHON_BASICS,
    questionText: "Trong Python, dùng toán tử nào để so sánh bằng (equality) giữa hai giá trị?",
    options: [
      "A. Toán tử gán (=)",
      "B. Toán tử so sánh bằng (==)",
      "C. Ký hiệu trùng khít (===)",
      "D. Từ khóa chỉ định thực thể (is)",
    ],
    correctAnswerIndex: 1,
    explanation: "Toán tử '==' được dùng để so sánh bằng về mặt giá trị (equality) giữa hai đối tượng. Toán tử '=' dùng để gán giá trị. Từ khóa 'is' dùng để so sánh tính đồng nhất định danh bộ nhớ (identity), còn '===' không tồn tại trong cú pháp Python."
  },
  {
    id: 4,
    category: Category.PYTHON_BASICS,
    questionText: "Trong cấu trúc vòng lặp while, hành động nào sau đây thường dẫn đến lỗi lặp vô hạn (infinite loop)?",
    options: [
      "A. Không cập nhật biểu thức điều kiện dừng hoặc biến kiểm soát trong thân vòng lặp.",
      "B. Dùng cấu trúc range() trong vòng lặp.",
      "C. Sử dụng biến đếm có kiểu dữ liệu int.",
      "D. Gọi hàm print() để hiển thị giá trị trong thân vòng lặp.",
    ],
    correctAnswerIndex: 0,
    explanation: "Vòng lặp while tiếp tục chạy chừng nào điều kiện lặp còn đúng (True). Nếu trong thân vòng lặp ta quên không cập nhật các toán hạng của biểu thức điều kiện lặp, dẫn tới biểu thức luôn đánh giá là True, vòng lặp sẽ chạy mãi mãi gây lỗi tràn bộ nhớ hoặc treo đơ chương trình."
  },
  {
    id: 5,
    category: Category.PYTHON_BASICS,
    questionText: "Giá trị của biểu thức logic boolean sau là gì trong Python?\nnot (True and False) or (False and True)",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Gây ra lỗi thực thi (Raises an error)",
    ],
    correctAnswerIndex: 0,
    explanation: "Đánh giá từng cụm:\n- (True and False) = False.\n- not (True and False) = not False = True.\n- (False and True) = False.\nDo đó: not (True and False) or (False and True) => True or False => True."
  },
  {
    id: 6,
    category: Category.PYTHON_BASICS,
    questionText: "Trong Python, thứ tự ưu tiên thực hiện đúng của các toán tử logic lần lượt là gì?",
    options: [
      "not ➔ and ➔ or",
      "and ➔ or ➔ not",
      "or ➔ and ➔ not",
      "not ➔ or ➔ and",
    ],
    correctAnswerIndex: 0,
    explanation: "Trong Python, toán tử 'not' có độ ưu tiên cao nhất, kế đến là 'and', và cuối cùng là 'or'. Điều này rất quan trọng để định giá trị đúng các biểu thức logic phức tạp."
  },
  {
    id: 7,
    category: Category.PYTHON_BASICS,
    questionText: "Phát biểu nào sau đây là đúng về cấu trúc từ điển (dictionary) trong Python?",
    options: [
      "A. Từ điển cho phép truy cập phần tử thông qua chỉ số vị trí (index) giống như danh sách (list).",
      "B. Các key trong từ điển có thể trùng nhau, mỗi key sẽ lưu trữ một tập hợp nhiều giá trị.",
      "C. Từ điển là một cấu trúc ánh xạ khóa-giá trị (key-value), trong đó khóa (key) bắt buộc phải là duy nhất.",
      "D. Từ điển không cho phép lưu trữ một list dưới dạng giá trị (value).",
    ],
    correctAnswerIndex: 2,
    explanation: "Khóa (key) trong từ điển Python bắt buộc phải là duy nhất và phải thuộc kiểu dữ liệu bất biến (hashable) để đảm bảo tra cứu nhanh O(1). Giá trị (value) đi kèm có thể trùng lặp và có thể là bất kỳ kiểu dữ liệu nào (kể cả list khác)."
  },
  {
    id: 8,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả của biểu thức string slicing `s[::-1]` trong Python đối với chuỗi `s = 'UET'` là gì?",
    options: [
      "'UET'",
      "'TEU'",
      "'E'",
      "'U'",
    ],
    correctAnswerIndex: 1,
    explanation: "Cú pháp slicing '[start:stop:step]' với 'step = -1' sẽ duyệt chuỗi từ cuối lên đầu, tương đương với việc đảo ngược chuỗi. Do đó 'UET' trở thành 'TEU'."
  },
  {
    id: 9,
    category: Category.PYTHON_BASICS,
    questionText: "Phát biểu nào sau đây là Đúng hay Sai: 'Nếu một hàm Python không định nghĩa câu lệnh return rõ ràng, hàm đó sẽ tự động trả về giá trị số 0.'",
    options: [
      "A. Đúng (True)",
      "B. Sai (False)",
      "C. Phụ thuộc hoàn toàn vào tham số đầu vào của hàm.",
      "D. Gây ra lỗi cú pháp (Raises a SyntaxError).",
    ],
    correctAnswerIndex: 1,
    explanation: "Phát biểu này là Sai. Nếu một hàm không kết thúc bằng từ khóa return rõ ràng hoặc chỉ viết return không đi kèm biểu thức, Python sẽ tự động trả về đối tượng đặc biệt 'None' đại diện cho việc vô giá trị, chứ không trả về số 0."
  },
  {
    id: 10,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức list.pop(i) khác phương thức list.remove(x) ở điểm cơ bản nào?",
    options: [
      "A. pop thực hiện xóa phần tử dựa trên giá trị; remove thực hiện xóa dựa trên chỉ số vị trí.",
      "B. pop thực hiện xóa theo chỉ số vị trí i (và trả về giá trị phần tử đó); remove xóa phần tử đầu tiên mang giá trị x tìm thấy (và không trả về giá trị).",
      "C. Cả hai phương thức đều thực hiện xóa phần tử dựa theo chỉ số vị trí.",
      "D. Cả hai phương thức đều xóa theo giá trị và đều trả về phần tử bị xóa.",
    ],
    correctAnswerIndex: 1,
    explanation: "list.pop(i) nhận vào chỉ số (vị trí i) cần xóa khỏi list và trả về chính đối tượng bị xóa đó (nếu bỏ trống i, nó xóa phần tử cuối cùng). Ngược lại, list.remove(x) nhận vào giá trị x mong muốn, tìm kiếm giá trị đó từ trái qua phải, xóa phần tử xuất hiện đầu tiên và không trả về giá trị phần tử."
  },
  {
    id: 11,
    category: Category.PYTHON_BASICS,
    questionText: "Phát biểu nào sau đây là đúng về phương thức list.sort() và hàm sorted(list)?",
    options: [
      "A. list.sort() trả về một danh sách đã sắp xếp mới; sorted() thực hiện sắp xếp trực tiếp tại chỗ (in-place).",
      "B. list.sort() thực hiện sắp xếp trực tiếp tại chỗ (in-place) và trả về None; sorted() trả về một danh sách mới đã được sắp xếp và giữ nguyên danh sách gốc.",
      "C. Cả hai cách gọi đều trả về giá trị mặc định là None.",
      "D. Cả hai cách gọi đều chỉ hỗ trợ sắp xếp các phần tử có kiểu dữ liệu là số nguyên.",
    ],
    correctAnswerIndex: 1,
    explanation: "list.sort() là một phương thức của đối tượng list, nó thay đổi trực tiếp thứ tự các phần tử trên chính ô nhớ của danh sách ban đầu (in-place) và trả về None. Ngược lại, hàm sorted(iterable) là một hàm độc lập, tạo ra một bản sao danh sách mới được sắp xếp gọn gàng và giữ nguyên danh sách nguyên bản của bạn."
  },
  {
    id: 12,
    category: Category.ALGORITHMS,
    questionText: "Kỹ thuật lập trình 'Lập trình' (Programming) được định nghĩa là gì?",
    options: [
      "A. Cho trước một bộ chỉ dẫn và một nhiệm vụ, thực hiện viết một chuỗi các chỉ dẫn logic để hoàn thành nhiệm vụ đó.",
      "B. Quá trình thiết kế cấu trúc vật lý của một hệ thống máy tính.",
      "C. Quá trình thao tác và sử dụng các phần mềm máy tính để giải quyết một công việc.",
      "D. Viết tay các đoạn mã lệnh chỉ dẫn lên giấy.",
    ],
    correctAnswerIndex: 0,
    explanation: "Định nghĩa cốt lõi của lập trình máy tính: Sáng tạo và xây dựng một chuỗi các bước chỉ dẫn logic chặt chẽ (thuật toán) bằng một ngôn ngữ lập trình cụ thể để ra lệnh cho máy tính thực thi một công việc hay khắc phục một vấn đề nào đó."
  },
  {
    id: 13,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trong quá trình gỡ lỗi (debugging), phát biểu nào sau đây về kĩ thuật Watch và Trace là đúng nhất?",
    options: [
      "A. Kỹ thuật Watch dùng để xem thứ tự thực thi của các dòng lệnh; kỹ thuật Trace dùng để theo dõi sự thay đổi của biến.",
      "B. Kỹ thuật Trace dùng để xem thứ tự thực thi của các dòng lệnh (in vết); kỹ thuật Watch dùng để theo dõi giá trị của một biểu thức hoặc biến theo thời gian thực.",
      "C. Watch và Trace là hai kỹ thuật chỉ có thể áp dụng được với vòng lặp, không áp dụng được với cấu trúc rẽ nhánh điều kiện.",
      "D. Kỹ thuật Trace chỉ có tác dụng khi chương trình đã bị dừng hoạt động đột ngột (crash).",
    ],
    correctAnswerIndex: 1,
    explanation: "Trace (vết) cho phép hiển thị tiến trình thực thi tuần tự của các dòng lệnh theo thời gian thực (được gọi là in vết/viết báo cáo). Watch (quan sát) cho phép lập trình viên găm một 'camera giám sát' vào một biểu thức hoặc biến cụ thể để theo sát sự biến dạng giá trị của nó qua từng dòng gỡ lỗi."
  },
  {
    id: 14,
    category: Category.PYTHON_BASICS,
    questionText: "Phương thức `my_dict.get(key, default)` hoạt động thế nào nếu không tìm thấy `key` trong dict?",
    options: [
      "Gây ra lỗi KeyError",
      "Trả về giá trị mặc định được chỉ định trong tham số 'default'",
      "Trả về giá trị None và thêm key đó vào dictionary",
      "Chương trình bị tạm dừng ngắt quãng",
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `get` của dictionary kiểm soát lỗi KeyError rất tốt bằng cách trả về giá trị của tham số 'default' nếu Key không tồn tại, mặc định là None nếu không chỉ định."
  },
  {
    id: 15,
    category: Category.PYTHON_BASICS,
    questionText: "Kết quả của biểu thức List Comprehension `[x**2 for x in range(5) if x % 2 == 1]` là gì?",
    options: [
      "[0, 4, 16]",
      "[1, 9]",
      "[1, 9, 25]",
      "[0, 1, 4, 9, 16]",
    ],
    correctAnswerIndex: 1,
    explanation: "`range(5)` tạo ra các số 0, 1, 2, 3, 4. Các số lẻ là 1 và 3. Bình phương của chúng là 1 và 9, xếp thành list `[1, 9]`."
  },
  {
    id: 16,
    category: Category.RECURSION_OOP,
    questionText: "Trong một định nghĩa hàm đệ quy, trường hợp cơ sở 'base case' đóng vai trò quan trọng gì?",
    options: [
      "A. Thực hiện gọi lại chính hàm đó với một cấu trúc tham số thu nhỏ hơn.",
      "B. Ngăn chặn chương trình không gặp phải các lỗi cú pháp biên dịch.",
      "C. Dừng quá trình gọi đệ quy lặp lại và trả về kết quả trực tiếp ngay lập tức, ngăn ngừa tràn ngăn xếp.",
      "D. Là phần chứa đoạn mã được máy tính thực thi nhiều lần nhất trong hàm.",
    ],
    correctAnswerIndex: 2,
    explanation: "Để hàm đệ quy không bị lặp vô tận, bắt buộc phải có ít nhất một trường hợp cơ sở - nơi thuật toán đạt mốc dừng cơ bản của bài toán toán học giản đơn nhất, trả về kết quả ngay mà không thực hiện gọi lại chính nó nữa."
  },
  {
    id: 17,
    category: Category.RECURSION_OOP,
    questionText: "Phát biểu nào sau đây là đúng về phương thức đặc biệt __init__ trong lớp (class) Python?",
    options: [
      "A. Phương thức __init__ bắt buộc phải chứa một từ khóa trả về đối tượng mới dạng 'return self'.",
      "B. Phương thức __init__ được gọi tự động khi một đối tượng mới được tạo ra để thiết lập trạng thái và các thuộc tính thuộc luồng thực thể ban đầu.",
      "C. Phương thức __init__ chỉ được thực thi khi lập trình viên chủ động viết gọi thủ công từ thực thể.",
      "D. Phương thức này có thể được đặt tên tùy ý theo mong muốn của lập trình viên chứ không bắt buộc tuân thủ cú pháp hệ thống.",
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `__init__` là hàm khởi tạo dọn chỗ (constructor) trong Python. Khi ta khởi tạo một thực thể bằng cách gọi `obj = ClassName()`, Python sẽ âm thầm tự động gọi `__init__` ngay tức khắc để nạp các tham số ban đầu, tuyệt đối không được return bất cứ thứ gì ngoài None."
  },
  {
    id: 18,
    category: Category.PYTHON_BASICS,
    questionText: "Phát biểu nào sau đây về tính khả biến của dữ liệu trong Python là đúng?",
    options: [
      "A. Danh sách (list) là kiểu dữ liệu bất biến; tuple là kiểu dữ liệu khả biến.",
      "B. Danh sách (list) là kiểu dữ liệu khả biến (mutable); tuple là kiểu dữ liệu bất biến (immutable).",
      "C. Cả list và tuple đều là các kiểu dữ liệu bất biến không thể sửa đổi sau khi tạo.",
      "D. Cả list và tuple đều là các kiểu dữ liệu khả biến dễ dàng sửa đổi trực tiếp.",
    ],
    correctAnswerIndex: 1,
    explanation: "List trong Python cho phép chỉnh sửa cấu trúc bên trong (phép gán, append, pop, v.v.), nên nó là 'mutable'. Tuple một khi đã khởi tạo thì không cho phép thay đổi các tham chiếu phần tử của nó nữa, do vậy Tuple là 'immutable'."
  },
  {
    id: 19,
    category: Category.PYTHON_BASICS,
    questionText: "Phép toán nào sau đây dùng để tìm các phần tử xuất hiện ở CẢ HAI tập hợp set A và set B trong Python?",
    options: [
      "A | B (Union)",
      "A & B (Intersection)",
      "A - B (Difference)",
      "A ^ B (Symmetric Difference)",
    ],
    correctAnswerIndex: 1,
    explanation: "Phép toán giao `&` (Intersection) giữa hai tập hợp trả về các phần tử cùng xuất hiện trong cả hai tập hợp A và B."
  },
  {
    id: 20,
    category: Category.RECURSION_OOP,
    questionText: "Cho hàm đệ quy sau, lời gọi hàm sum_list([1, 2, 3]) sẽ trả về kết quả là bao nhiêu?",
    codeSnippet: "def sum_list(lst):\n    if not lst:\n        return 0\n    return lst[0] + sum_list(lst[1:])",
    options: [
      "A. 0",
      "B. 3",
      "C. 6",
      "D. 7",
    ],
    correctAnswerIndex: 2,
    explanation: "Diễn giải đệ quy:\n- sum_list([1, 2, 3]) = 1 + sum_list([2, 3])\n- sum_list([2, 3]) = 2 + sum_list([3])\n- sum_list([3]) = 3 + sum_list([])\n- sum_list([]) chạm case 'not lst' -> trả về 0.\nTính ngược từ dưới lên: 3 + 0 = 3; 2 + 3 = 5; 1 + 5 = 6. Kết quả in ra là 6."
  },
  {
    id: 21,
    category: Category.FILES_LIBRARIES,
    questionText: "Đoạn mã nguồn Python sau hiển thị kết quả gì ra màn hình?",
    codeSnippet: "d = {'a': 1, 'b': 2}\nprint(d.get('c', 3))",
    options: [
      "A. 1",
      "B. 2",
      "C. 3",
      "D. Gây ra lỗi vì khóa không tồn tại trong từ điển.",
    ],
    correctAnswerIndex: 2,
    explanation: "Phương thức `get(key, default)` của từ điển Python giúp truy cập khóa một cách an toàn. Nếu khóa tồn tại thì trả về giá trị của khóa, ngược lại sẽ trả về giá trị mặc định được định cấu hình sẵn (ở đây là số 3), tuyệt đối không bao giờ làm ngắt dòng chạy chương trình do lỗi KeyError."
  },
  {
    id: 22,
    category: Category.PYTHON_BASICS,
    questionText: "Đặc điểm nào dưới đây mô tả chính xác nhất tính chất của kiểu dữ liệu Tuple trong Python?",
    options: [
      "Có thể thay đổi phần tử (mutable) và các phần tử trùng lặp",
      "Không thể thay đổi phần tử (immutable) và các phần tử trùng lặp",
      "Không thể chứa các kiểu dữ liệu khác nhau",
      "Luôn tự động sắp xếp theo thứ tự tăng dần",
    ],
    correctAnswerIndex: 1,
    explanation: "Tuple là kiểu dữ liệu tuần tự có tính bất biến (immutable), cho phép chứa các phần tử trùng lặp và cực kỳ an toàn để lưu dữ liệu cố định."
  },
  {
    id: 23,
    category: Category.FILES_LIBRARIES,
    questionText: "Lợi ích quan trọng nhất của cú pháp mở tệp tin dưới dạng: with open(...) as file: là gì?",
    options: [
      "A. Giúp chương trình thực thi các thao tác đọc và ghi tệp nhanh hơn gấp đôi.",
      "B. Cho phép chương trình mở và đọc đồng thời nhiều tệp tin khác nhau.",
      "C. Tự động giải phóng hoàn toàn và đóng tệp tin một cách an toàn tuyệt đối ngay cả khi xảy ra lỗi đột ngột bên trong khối lệnh.",
      "D. Hỗ trợ tự động định dạng và sắp xếp lại nội dung văn bản tệp tin.",
    ],
    correctAnswerIndex: 2,
    explanation: "Cú pháp `with` triển khai bộ quản lý chu trình ngữ cảnh (Context Manager) trong Python. Nó chịu trách nhiệm tự động gọi phương thức đóng file âm thầm khi luồng chạy thoát khỏi tầm của khối lệnh `with`, đảm bảo tệp luôn được đóng kín an toàn trong bộ nhớ hệ điều hành dù trước đó có gặp lỗi kĩ thuật giữa dòng."
  },
  {
    id: 24,
    category: Category.PYTHON_BASICS,
    questionText: "Trong Python, lỗi nào xảy ra khi bạn cố gắng truy cập hoặc sử dụng một biến chưa được định nghĩa?",
    options: [
      "TypeError",
      "ValueError",
      "NameError",
      "AttributeError",
    ],
    correctAnswerIndex: 2,
    explanation: "Khi cố truy cập một biến chưa được khởi tạo hoặc gán giá trị trong phạm vi hiện tại, trình biên dịch Python sẽ kích hoạt một lỗi 'NameError'."
  },
  {
    id: 25,
    category: Category.PYTHON_BASICS,
    questionText: "Tại sao nên tránh việc định nghĩa tham số mặc định là một đối tượng thay đổi được (như mutable list `[]`) trong Python?",
    options: [
      "Vì nó sẽ gây ra SyntaxError ngay khi chạy",
      "Vì đối tượng mutable khởi tạo một lần và được chia sẻ qua các lần gọi hàm, gây tích lũy dữ liệu ngoài ý muốn",
      "Vì Python không cho phép truyền list làm tham số mặc định",
      "Vì hiệu năng của hàm sẽ bị giảm đi 10 lần",
    ],
    correctAnswerIndex: 1,
    explanation: "Tham số mặc định trong Python chỉ được tính giá trị một lần duy nhất khi hàm được định nghĩa. Nếu sử dụng list rỗng `[]`, mọi lần gọi không truyền tham số mới sẽ dùng chung một đối tượng list đó và tích lũy phần tử."
  },
  {
    id: 26,
    category: Category.RECURSION_OOP,
    questionText: "Trong dòng mã nguồn Python dưới đây, danh xưng chuyên môn dành cho biến 'p' được gọi là gì?\np = User('UET')",
    options: [
      "A. Một lớp (class)",
      "B. Một phương thức (method)",
      "C. Một đối tượng / thực thể cụ thể thuộc lớp (object/instance)",
      "D. Một thuộc tính (attribute)",
    ],
    correctAnswerIndex: 2,
    explanation: "Dòng lệnh khởi tạo một thực thể thực sự từ bản thiết kế lớp 'User'. Biến 'p' lưu trữ và tham chiếu tới đối tượng (object/instance) cụ thể này trong bộ nhớ ứng dụng."
  },
  {
    id: 27,
    category: Category.DEBUGGING_TESTING,
    questionText: "Theo tài liệu chính thức 'Danh sách kiểm tra sự phụ thuộc quá mức vào AI', hành vi nào chỉ ra một sinh viên UET đang có xu hướng lạm dụng AI quá mức?",
    options: [
      "A. Lập tức hỏi AI ngay khi gặp bất kỳ thông báo lỗi nào mà không tự suy nghĩ hay thử chủ động tự gỡ lỗi trước.",
      "B. Sử dụng AI để nhờ giải thích một khái niệm lý thuyết trừu tượng chưa hiểu rõ sâu sắc.",
      "C. Nhờ AI gợi ý phương án viết tối ưu hóa hiệu năng cho một hàm đã tự hoàn thành logic.",
      "D. Sử dụng AI để hỗ trợ rà soát lỗi bảo mật tiềm ẩn của mã nguồn sau khi bản thân đã tự viết và chạy thử xong.",
    ],
    correctAnswerIndex: 0,
    explanation: "Một lập trình viên lạm dụng AI quá mức khi mất đi khả năng tự suy luận và gỡ lỗi độc lập. Việc dán dòng thông báo lỗi vào AI ngay lập tức sẽ tước đoạt cơ hội rèn luyện khả năng đọc hiểu stack trace lỗi và tư duy phân tích của bản thân."
  },
  {
    id: 28,
    category: Category.RECURSION_OOP,
    questionText: "Cho đoạn mã sau, chương trình sẽ hiển thị kết quả gì trên màn hình?",
    codeSnippet: "class A:\n    y = 10 # class attribute\n    def __init__(self):\n        self.x = 5 # instance attribute\n\nobj = A()\nprint(obj.y)",
    options: [
      "A. 10",
      "B. 5",
      "C. Gây ra lỗi AttributeError",
      "D. None",
    ],
    correctAnswerIndex: 0,
    explanation: "`y` được khai báo trực tiếp trong thân của lớp A (nằm ngoài các method), do đó `y` là một thuộc tính lớp (class attribute). Các thực thể của lớp A (như `obj`) hoàn toàn có thể truy cập hợp lệ vào thuộc tính lớp này. Kết quả in ra là 10."
  },
  {
    id: 29,
    category: Category.DEBUGGING_TESTING,
    questionText: "Phát biểu nào sau đây đúng nhất về lỗi cú pháp (Syntax Error) trong Python?",
    options: [
      "A. Syntax Error chỉ xảy ra trong quá trình chương trình đang chạy và hoàn toàn có thể xử lý êm đẹp bằng khối try-except.",
      "B. Syntax Error xảy ra do viết sai quy chế ngữ pháp được ngôn ngữ định sẵn và được phát hiện bởi trình phân tích cú pháp (parser) ngay trước khi chương trình bắt đầu chạy cấu trúc thực thi.",
      "C. Syntax Error là loại lỗi đặc thù chỉ phát sinh khi thực hiện phép toán thực tế chia một số cho số 0.",
      "D. Syntax Error là lỗi xảy ra do đường dẫn tệp tin cần mở không tồn tại trên ổ cứng.",
    ],
    correctAnswerIndex: 1,
    explanation: "Lỗi cú pháp (Syntax Error) là lỗi viết sai quy tắc ngôn ngữ (như quên ngoặc, viết sai từ khóa, thiếu dấu hai chấm). Nó bị bộ thông dịch Python phát hiện ra ở khâu biên dịch/phân tích từ vựng (parsing stage) TRƯỚC KHI chương trình bắt đầu chạy, do đó không thể gỡ hay bắt nó bằng cấu trúc khôi phục try-except khi đang chạy được."
  },
  {
    id: 30,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian trong trường hợp tốt nhất (Best Case) của thuật toán Tìm kiếm nhị phân (Binary Search) là gì?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
    ],
    correctAnswerIndex: 0,
    explanation: "Trường hợp tốt nhất là khi phần tử ở vị trí chính giữa của danh sách cần tìm chính là phần tử mục tiêu ngay trong lần so sánh đầu tiên, mất độ phức tạp O(1)."
  },
  {
    id: 31,
    category: Category.DEBUGGING_TESTING,
    questionText: "Điểm khác biệt cốt lõi giữa câu lệnh return và hàm print() trong một hàm là gì?",
    options: [
      "A. return gửi trả lại giá trị tính toán cho nơi gọi hàm; print() chỉ thực hiện hiển thị thông tin dữ liệu ra màn hình thiết bị.",
      "B. print() gửi trả lại giá trị; return chỉ thực hiện hiển thị lên màn hình.",
      "C. Cả hai câu lệnh này đều kết thúc việc thực thi của hàm ngay lập tức.",
      "D. return là câu lệnh chỉ được phép sử dụng bên trong cấu trúc các vòng lặp.",
    ],
    correctAnswerIndex: 0,
    explanation: "print() chỉ hiển thị ký tự lên console màn hình cho con người thưởng lãm trực quan, máy tính không thể lấy đầu ra đó làm dữ liệu trung gian tính tiếp. Trái lại, return gởi kết quả tính được về cho luồng đã gọi hàm, định hình câu trả lời cho thuật toán vận hành tiếp tục."
  },
  {
    id: 32,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp không gian (Space Complexity) của thuật toán Merge Sort khi chạy trên cấu trúc mảng thông thường là gì?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
    ],
    correctAnswerIndex: 2,
    explanation: "Merge Sort cần một không gian mảng phụ có kích thước tỷ lệ thuận với số lượng phần tử N để thực hiện thao tác trộn (Merge), vì vậy độ phức tạp bộ nhớ là O(N)."
  },
  {
    id: 33,
    category: Category.ALGORITHMS,
    questionText: "Đối với mảng không sắp xếp có kích thước N, số lần so sánh tối đa phải thực hiện trong thuật toán Tìm kiếm tuyến tính (Linear Search) là bao nhiêu?",
    options: [
      "log N lần",
      "N - 1 lần",
      "N lần",
      "N/2 lần",
    ],
    correctAnswerIndex: 2,
    explanation: "Trong trường hợp xấu nhất (phần tử cần tìm ở cuối mảng hoặc không tồn tại), tìm kiếm tuyến tính phải duyệt qua toàn bộ N phần tử, thực hiện tối đa N lần so sánh."
  },
  {
    id: 34,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau, điều gì sẽ xảy ra khi thực hiện thực thi chương trình này?",
    codeSnippet: "def divide(a, b):\n    assert b != 0, \"b cannot be zero\"\n    return a / b\n\nprint(divide(10, 0))",
    options: [
      "A. Chương trình in ra giá trị vô cùng đặc biệt: inf.",
      "B. Chương trình phát sinh lỗi chia cho số không ZeroDivisionError.",
      "C. Chương trình phát sinh lỗi khẳng định thiết kế thất bại: AssertionError.",
      "D. Chương trình trả về giá trị mặc định None.",
    ],
    correctAnswerIndex: 2,
    explanation: "Câu lệnh `assert <điều kiện>, <thông điệp>` hoạt động bằng cách kiểm tra điều kiện logic. Với divide(10, 0), vế kiểm tra là `0 != 0` đánh giá thành False. Assert lập tức thất bại và dừng chương trình bằng cách quăng ra ngoại lệ `AssertionError: b cannot be zero` trước khi kịp thực hiện phép chia ở dòng dưới."
  },
  {
    id: 35,
    category: Category.FILES_LIBRARIES,
    questionText: "Giả sử bạn có một DataFrame trong thư viện Pandas tên là df. Lệnh nào giúp hiển thị nhanh 5 dòng dữ liệu đầu tiên để kiểm tra cấu trúc dữ liệu tải lên?",
    options: [
      "A. df.top()",
      "B. df.head()",
      "C. df.show(5)",
      "D. df.first(5)",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Pandas, hàm `df.head(n)` mặc định lấy n dòng dữ liệu đầu tiên của DataFrame, mặc định là 5 dòng nếu không chỉ định rõ đối số. Đây là cách tuyệt hảo để kiểm tra nhanh sơ cấp sơ đồ thiết kế bảng dữ liệu."
  },
  {
    id: 36,
    category: Category.ALGORITHMS,
    questionText: "Nếu đưa vào một danh sách đã được sắp xếp tăng dần, thuật toán Nổi bọt (Bubble Sort) thông thường sẽ thực hiện bao nhiêu lần tráo đổi (swap)?",
    options: [
      "0 lần",
      "N lần",
      "N(N - 1)/2 lần",
      "N log N lần",
    ],
    correctAnswerIndex: 0,
    explanation: "Khi danh sách đã được sắp xếp sẵn, các cặp phần tử liên tiếp luôn thỏa mãn điều kiện nên không có thao tác tráo đổi (swap) nào được kích hoạt."
  },
  {
    id: 37,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã nguồn sau in ra kết quả gì?",
    codeSnippet: "for i in range(3):\n    for j in range(2):\n        print((i, j))",
    options: [
      "A. Các tuple hiển thị tuần tự theo thứ tự: (0,0), (0,1), (1,0), (1,1), (2,0), (2,1) trên từng dòng riêng biệt.",
      "B. Một chuỗi số kéo dài: 0 0 0 1 1 0 1 1 2 0 2 1 trên cùng một dòng.",
      "C. Hiển thị dãy số 0 1 1 2 2 3.",
      "D. Chỉ in duy nhất 3 dòng dữ liệu.",
    ],
    correctAnswerIndex: 0,
    explanation: "range(3) sinh ra các giá trị i: 0, 1, 2. range(2) sinh ra các giá trị j: 0, 1. Vòng lặp lồng nhau sẽ chạy tích Đề-các:\ni=0: j=0 => print((0,0)); j=1 => print((0,1))\ni=1: j=0 => print((1,0)); j=1 => print((1,1))\ni=2: j=0 => print((2,0)); j=1 => print((2,1))."
  },
  {
    id: 38,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian trung bình để tìm kiếm một phần tử trong Bảng băm (Hash Table) được triển khai tối ưu là bao nhiêu?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)",
    ],
    correctAnswerIndex: 0,
    explanation: "Nhờ hàm băm ánh xạ trực tiếp từ khóa sang chỉ mục bộ nhớ, thời gian tìm kiếm trung bình của bảng băm là O(1) bất kể kích thước cơ sở dữ liệu."
  },
  {
    id: 39,
    category: Category.RECURSION_OOP,
    questionText: "Nếu một hàm đệ quy không định nghĩa chính xác trường hợp cơ sở (base case) hoặc trường hợp cơ sở không bao giờ đạt tới được, hậu quả xảy ra là gì?",
    options: [
      "A. Chương trình báo lỗi cú pháp SyntaxError trước khi chạy.",
      "B. Chương trình báo lỗi thực hiện phép toán không hợp lệ ZeroDivisionError.",
      "C. Chương trình báo lỗi vượt quá giới hạn độ sâu ngăn xếp cuộc gọi: RecursionError.",
      "D. Trình thông dịch tự động tối ưu hóa cấu trúc đệ quy và chương trình vẫn ra kết quả đúng.",
    ],
    correctAnswerIndex: 2,
    explanation: "Nếu thiếu điều kiện dừng, các cuộc gọi hàm đệ quy lồng nhau sẽ liên tục chiếm đóng và chồng đè lên nhau trong phân vùng bộ nhớ ngăn xếp cuộc gọi (Call Stack). Khi chạm mức giới hạn hệ thống cho phép, Python sẽ dập tắt tiến trình và bắn ra lỗi ngoại lệ RecursionError: maximum recursion depth exceeded."
  },
  {
    id: 40,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau, chương trình in ra màn hình các giá trị nào?",
    codeSnippet: "for num in range(1, 4):\n    print(num)",
    options: [
      "A. 1, 2, 3 (mỗi số trên một dòng)",
      "B. 1, 2, 3, 4 (mỗi số trên một dòng)",
      "C. 0, 1, 2 (mỗi số trên một dòng)",
      "D. Một danh sách chứa ba phần tử [1, 2, 3]",
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm range(start, stop) sinh ra dãy số bắt đầu từ 'start' (bao gồm start) đến trước 'stop' (không chấp nhận dừng ở stop, cận trên bị loại trừ). Do đó range(1, 4) trả về dãy 1, 2, 3."
  },
  {
    id: 41,
    category: Category.ALGORITHMS,
    questionText: "Trong tìm kiếm nhị phân, biểu thức thực tế tốt nhất để tính chỉ mục chính giữa (mid) để tránh tràn số (integer overflow) trong các ngôn ngữ có kiểu tĩnh là gì?",
    options: [
      "mid = (low + high) / 2",
      "mid = low + (high - low) / 2",
      "mid = (low * high) / 2",
      "mid = high - (low / 2)",
    ],
    correctAnswerIndex: 1,
    explanation: "Biểu thức `low + (high - low) / 2` bảo đảm giá trị trung gian không bao giờ vượt quá khoảng giới hạn lưu trữ dữ liệu của biến số nguyên, chống tràn số cực kỳ hiệu quả."
  },
  {
    id: 42,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau, chương trình sẽ hiển thị kết quả gì trên màn hình?",
    codeSnippet: "nums = [6, 0, 7]\nfor num in nums:\n    num += 1\nprint(nums)",
    options: [
      "A. [7, 1, 8]",
      "B. [6, 0, 7]",
      "C. [6, 0, 7, 1]",
      "D. Chương trình báo lỗi vì không thể thực hiện phép cộng trực tiếp.",
    ],
    correctAnswerIndex: 1,
    explanation: "Khi duyệt qua `for num in nums:`, biến `num` nhận các giá trị số là bản sao kiểu int (immutable) của các phần tử trong danh sách. Phép toán `num += 1` chỉ thay đổi giá trị cục bộ của biến lặp `num`, hoàn toàn không ảnh hưởng tới các giá trị nguyên bản lưu trữ bên trong danh sách gốc `nums`. Do đó `nums` vẫn giữ nguyên là [6, 0, 7]."
  },
  {
    id: 43,
    category: Category.ALGORITHMS,
    questionText: "Cấu trúc dữ liệu Hàng đợi (Queue) tuân theo nguyên lý hoạt động nào dưới đây?",
    options: [
      "LIFO (Last In, First Out)",
      "FIFO (First In, First Out)",
      "LILO (Last In, Last Out)",
      "FILO (First In, Last Out)",
    ],
    correctAnswerIndex: 1,
    explanation: "Hàng đợi hoạt động theo cơ chế FIFO (Vào trước, Ra trước). Phần tử nào được thêm vào hàng đợi trước sẽ được lấy ra để xử lý trước."
  },
  {
    id: 44,
    category: Category.ALGORITHMS,
    questionText: "Trong trường hợp xấu nhất (worst case), độ phức tạp thời gian của thuật toán tìm kiếm nhị phân (binary search) trên danh sách có kích thước n là gì?",
    options: [
      "A. O(1)",
      "B. O(log n)",
      "C. O(n)",
      "D. O(n log n)",
    ],
    correctAnswerIndex: 1,
    explanation: "Tại mỗi bước của tìm kiếm nhị phân, không gian tìm kiếm bị thu hẹp đi một nửa (chia đôi). Số lần chia đôi tối đa để tìm thấy hoặc kết luận không thấy trên n phần tử là log cơ số 2 của n. Do đó độ phức tạp xấu nhất là O(log n)."
  },
  {
    id: 45,
    category: Category.RECURSION_OOP,
    questionText: "Khi gọi hàm fact(4) được định nghĩa dưới đây, giá trị trả về là bao nhiêu?",
    codeSnippet: "def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n - 1)",
    options: [
      "A. 4",
      "B. 12",
      "C. 24",
      "D. 120",
    ],
    correctAnswerIndex: 2,
    explanation: "Hàm factorial (giai thừa) đệ quy tính toán:\n- fact(4) = 4 * fact(3)\n- fact(3) = 3 * fact(2)\n- fact(2) = 2 * fact(1)\n- fact(1) = 1 (chạm trường hợp cơ sở).\nTính nhân ngược: 2 * 1 = 2; 3 * 2 = 6; 4 * 6 = 24. Kết quả 4! = 24."
  },
  {
    id: 46,
    category: Category.DEBUGGING_TESTING,
    questionText: "Cho đoạn mã sau, kết quả hiển thị thực tế ra màn hình là gì?",
    codeSnippet: "def divide(a, b):\n    try:\n        result = a / b\n        print(\"Result is\", result)\n    except ZeroDivisionError:\n        print(\"Cannot divide by zero.\")\n    finally:\n        print(\"Cleaning up and completing.\")\n\ndivide(10, 0)",
    options: [
      "A. In ra thông báo lỗi đi kèm dọn dẹp hệ thống.",
      "B. Xuất hiện hai dòng chữ: 'Cannot divide by zero.' và 'Cleaning up and completing.'",
      "C. Chỉ in dòng chữ duy nhất là: 'Cannot divide by zero.'",
      "D. Chỉ in dòng chữ duy nhất là: 'Cleaning up and completing.'",
    ],
    correctAnswerIndex: 1,
    explanation: "Với divide(10, 0), khi chạy dòng `a / b` (tức 10/0) ném ra ZeroDivisionError. Luồng chạy nhảy sang block `except ZeroDivisionError` phục hồi lỗi và in 'Cannot divide by zero.'. Cuối cùng, bất luận có lỗi hay không, block `finally` bắt buộc luôn luôn được thực thi hệ thống, do vậy in tiếp dòng 'Cleaning up and completing.'."
  },
  {
    id: 47,
    category: Category.ALGORITHMS,
    questionText: "Thuật toán Sắp xếp chọn (Selection Sort) thực hiện bao nhiêu lần so sánh phần tử ở mọi trường hợp đối với mảng có kích thước N?",
    options: [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "Phụ thuộc hoàn toàn vào độ sắp xếp ban đầu của mảng",
    ],
    correctAnswerIndex: 2,
    explanation: "Selection Sort luôn tìm phần tử nhỏ nhất trên các mảng con bằng các vòng lặp độc lập với trật tự ban đầu của dữ liệu, số lần so sánh luôn là N(N-1)/2, tức độ phức tạp O(N^2)."
  },
  {
    id: 48,
    category: Category.ALGORITHMS,
    questionText: "Về mặt không gian bộ nhớ, khi biểu diễn một đồ thị thưa (ít cạnh), phương pháp biểu diễn nào tối ưu hơn?",
    options: [
      "Ma trận kề (Adjacency Matrix)",
      "Danh sách kề (Adjacency List)",
      "Ma trận liên thuộc",
      "Cả hai phương pháp tốn bộ nhớ ngang nhau",
    ],
    correctAnswerIndex: 1,
    explanation: "Danh sách kề tốn bộ nhớ tỷ lệ thuận với số lượng đỉnh và cạnh O(V + E), trong khi ma trận kề luôn tốn bộ nhớ cố định O(V^2), làm lãng phí bộ nhớ khi đồ thị thưa."
  },
  {
    id: 49,
    category: Category.ALGORITHMS,
    questionText: "Ba bước cốt lõi của chiến lược thiết kế thuật toán Chia để trị (Divide and Conquer) lần lượt là gì?",
    options: [
      "Tách nhỏ ➔ Sắp xếp ➔ Tìm kiếm",
      "Chia (Divide) ➔ Trị (Conquer) ➔ Kết hợp (Combine)",
      "Trực quan hóa ➔ Chạy thử ➔ Sửa lỗi",
      "Lặp ➔ Thiết lập điều kiện ➔ Kết thúc",
    ],
    correctAnswerIndex: 1,
    explanation: "Chia thức là chia nhỏ bài toán gốc thành các bài toán độc lập, Trị là giải quyết các bài toán con bằng đệ quy, và Kết hợp là tập hợp đáp án của các bài toán con để hoàn thành bài toán tổng."
  },
  {
    id: 50,
    category: Category.PYTHON_BASICS,
    questionText: "Vòng lặp sau thực hiện khối lệnh bên trong (pass) bao nhiêu lần?",
    codeSnippet: "for i in range(2, 10, 2):\n    pass",
    options: [
      "A. 3 lần",
      "B. 4 lần",
      "C. 5 lần",
      "D. 6 lần",
    ],
    correctAnswerIndex: 1,
    explanation: "range(2, 10, 2) khởi đầu từ 2, kết thúc trước 10, tăng dần bước nhảy là 2 đơn vị. Tập hợp các giá trị được duyệt là: {2, 4, 6, 8}. Lớp vòng lặp sẽ thực hiện 4 lần lặp."
  },
  {
    id: 51,
    category: Category.RECURSION_OOP,
    questionText: "Với mã nguồn đệ quy tính giai thừa dưới đây, lời gọi hàm `factorial(4)` sẽ kích hoạt tổng cộng bao nhiêu lời gọi hàm con (bao gồm cả lời gọi gốc)?",
    codeSnippet: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
    options: [
      "3 lần",
      "4 lần",
      "5 lần",
      "6 lần",
    ],
    correctAnswerIndex: 1,
    explanation: "Các lời gọi hàm lần lượt là: factorial(4) ➔ factorial(3) ➔ factorial(2) ➔ factorial(1). Vì n = 1 đạt điều kiện dừng nên quá trình dừng lại, tổng cộng có 4 lời gọi."
  },
  {
    id: 52,
    category: Category.RECURSION_OOP,
    questionText: "Hiện tượng gì xảy ra trong hệ thống nếu một hàm đệ quy được gọi liên tục mà không đạt được hoặc không có điều kiện dừng (Base case)?",
    options: [
      "Bộ nhớ Heap bị tràn lập tức",
      "Gây ra lỗi Stack Overflow (Tràn bộ nhớ ngăn xếp)",
      "Chương trình chạy vô tận mà không báo lỗi gì",
      "Trình biên dịch tự động tối ưu hóa và đưa ra kết quả giả định",
    ],
    correctAnswerIndex: 1,
    explanation: "Mỗi lời gọi hàm đệ quy sẽ thêm một khung dữ liệu (Stack Frame) vào bộ nhớ Call Stack. Nếu đệ quy vô tận, dung lượng ngăn xếp bị vượt quá giới hạn gây lỗi Stack Overflow."
  },
  {
    id: 53,
    category: Category.RECURSION_OOP,
    questionText: "Trong định nghĩa phương thức của lớp Python, tham số 'self' dùng để đại diện cho thành phần nào?",
    options: [
      "A. Đại diện cho một biến toàn cục dùng chung xuyên suốt mọi đối tượng thuộc lớp.",
      "B. Đại diện cho chính đối tượng/thực thể cụ thể (instance) đang trực tiếp gọi phương thức đó.",
      "C. Là tên định danh cố định bắt buộc phải đặt trùng với tên của lớp (class).",
      "D. Định nghĩa kiểu dữ liệu mặc định cho các tham số đầu vào của hàm.",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong OOP Python, `self` chính là tham chiếu lịch sự trỏ thẳng vào chính đối tượng thực thể duy nhất hiện đang vận hành phương thức. Từ đó phương thức có thể dễ dàng đọc hay ghi dữ liệu độc lập của chính nó."
  },
  {
    id: 54,
    category: Category.ALGORITHMS,
    questionText: "Phát biểu nào sau đây mô tả đúng nhất về giải thuật tìm kiếm nhị phân (binary search)?",
    options: [
      "A. Binary search hoạt động hiệu quả trên mọi cấu trúc danh sách bất kể các phần tử đã được sắp xếp hay chưa.",
      "B. Binary search liên tục chia đôi không gian tìm kiếm tại mỗi bước và bắt buộc cấu trúc dữ liệu đầu vào phải được sắp xếp trước theo một trật tự xác định.",
      "C. Binary search luôn duy trì độ phức tạp thời gian trong mọi trường hợp là O(n).",
      "D. Binary search là thuật toán chỉ hỗ trợ áp dụng được với danh sách chứa các phần tử duy nhất không trùng lặp.",
    ],
    correctAnswerIndex: 1,
    explanation: "Điều kiện tiên quyết để áp dụng tìm kiếm nhị phân là mảng dữ liệu đầu vào đã phải được sắp xếp sẵn. Nhờ đó thuật toán có thể tự tin loại bỏ một nửa không gian tìm kiếm sau mỗi phép so sánh với phần tử trung tâm."
  },
  {
    id: 55,
    category: Category.RECURSION_OOP,
    questionText: "Trong đoạn mã kế thừa Python dưới đây, hàm `super().__init__(name)` có vai trò cốt lõi là gì?",
    codeSnippet: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed",
    options: [
      "Tạo ra một instance mới của lớp Animal độc lập",
      "Gọi hàm khởi tạo của lớp cha (Animal) để thiết lập thuộc tính name cho Dog",
      "Chuyển đổi kiểu dữ liệu của Dog kế thừa thành Animal",
      "Gọi hàm kiểm thử tự động của Python",
    ],
    correctAnswerIndex: 1,
    explanation: "`super()` trả về một đối tượng đại diện cho lớp cha (Animal). Sử dụng `super().__init__(name)` giúp tái sử dụng mã khởi tạo thuộc tính của lớp cha một cách chính thống."
  },
  {
    id: 56,
    category: Category.RECURSION_OOP,
    questionText: "Trong Python, lập trình viên quy ước thuộc tính/phương thức ở mức độ truy cập private (riêng tư) bằng cách nào?",
    options: [
      "Sử dụng từ khóa public và private đặt trước thuộc tính",
      "Thêm hai dấu gạch dưới (Double underscores) chuẩn bị ở đầu tên, ví dụ: `__my_attrib`",
      "Khai báo đối tượng bên trong một file Python khác",
      "Sử dụng decorator @private",
    ],
    correctAnswerIndex: 1,
    explanation: "Khi đặt tiền tố hai dấu gạch dưới `__`, Python sẽ áp dụng kỹ thuật xáo trộn tên (Name Mangling) để gây khó khăn cho việc truy cập trực tiếp từ bên ngoài lớp."
  },
  {
    id: 57,
    category: Category.ALGORITHMS,
    questionText: "Trong các thành phần cốt lõi của Tư duy Tính toán, kỹ thuật 'Phân rã' (Decomposition) được định nghĩa là gì?",
    options: [
      "A. Chia một vấn đề lớn, phức tạp thành các bài toán/phần nhỏ hơn để dễ dàng quản lý, phân tích và thiết kế giải pháp.",
      "B. Phân tích và tìm kiếm những điểm tương đồng hoặc các đặc trưng lặp đi lặp lại của vấn đề.",
      "C. Tập trung xử lý các chi tiết mấu chốt, quan trọng và loại bỏ hoàn toàn các thông tin không liên quan.",
      "D. Thiết kế và xây dựng các chỉ dẫn từng bước một để máy tính thực hiện giải quyết vấn đề.",
    ],
    correctAnswerIndex: 0,
    explanation: "Kỹ thuật 'Phân rã' (Decomposition) là hành vi thông thái chia một thử thách khổng lồ hoặc khó hiểu ra thành các phần nhỏ, mạch lạc, dễ xử lý độc lập hơn. Từ đó thiết lập các giải pháp nhỏ và kết hợp lại cho bức tranh lớn."
  },
  {
    id: 58,
    category: Category.RECURSION_OOP,
    questionText: "Khái niệm Đa hình (Polymorphism) trong lập trình OOP được thể hiện rõ nhất qua kịch bản nào dưới đây?",
    options: [
      "Một lớp sở hữu nhiều thuộc tính có kiểu dữ liệu khác nhau",
      "Các lớp con kế thừa từ cùng một lớp cha định nghĩa lại cùng một phương thức theo cách riêng",
      "Tạo ra nhiều đối tượng trong cùng một luồng thực thi",
      "Nén toàn bộ các lớp vào trong duy nhất một tệp",
    ],
    correctAnswerIndex: 1,
    explanation: "Đa hình cho phép gửi cùng một thông điệp (gọi một phương thức trùng tên) tới các đối tượng thuộc các lớp khác nhau và nhận về hành vi đặc trưng tương ứng với lớp đó."
  },
  {
    id: 59,
    category: Category.PYTHON_BASICS,
    questionText: "Đoạn mã sau hiển thị kết quả gì ra màn hình?",
    codeSnippet: "for i in range(3):\n    if i == 1:\n        continue\n    print(i)",
    options: [
      "A. Hiển thị liên tục ba dòng chứa các số: 0, 1, 2.",
      "B. Hiển thị hai dòng chứa các số: 0 và 2.",
      "C. Chỉ hiển thị duy nhất số 1.",
      "D. Chỉ hiển thị duy nhất số 2.",
    ],
    correctAnswerIndex: 1,
    explanation: "range(3) tạo giá trị i: 0, 1, 2.\n- i = 0: Điều kiện check i == 1 là False -> thực hiện print(0).\n- i = 1: Điều kiện i == 1 là True -> nhảy tới từ khóa continue, ngay lập tức bỏ qua phần in ấn bên dưới để tiếp tục lượt lặp kế tiếp.\n- i = 2: Điều kiện là False -> chạy print(2)."
  },
  {
    id: 60,
    category: Category.ALGORITHMS,
    questionText: "Cho danh sách đã được sắp xếp tăng dần: a = [2, 4, 6, 8, 10]. Khi áp dụng giải thuật tìm kiếm nhị phân để tìm giá trị 8, sau lượt so sánh đầu tiên với phần tử ở giữa (mid), khoảng danh sách tìm kiếm còn lại cần duyệt tiếp là gì?",
    options: [
      "A. [2, 4]",
      "B. [2, 4, 6]",
      "C. [8, 10]",
      "D. [10]",
    ],
    correctAnswerIndex: 2,
    explanation: "Xét chỉ số:\n- Độ dài a là 5. Đầu là left = 0 (trị 2), cuối là right = 4 (trị 10).\n- Vị trí giữa mid = (0 + 4) // 2 = 2. a[2] = 6.\n- Ta tìm giá trị 8. Vì 8 > 6, nên vùng tìm kiếm tiếp theo nằm ở nửa bên phải: từ mid + 1 tức là chỉ số 3 đến 4. Khoảng danh sách con còn lại là a[3:5], tương đương bộ [8, 10]."
  },
  {
    id: 61,
    category: Category.RECURSION_OOP,
    questionText: "Sự khác biệt quan trọng nhất giữa biến lớp (Class Variable) và biến thực thể (Instance Variable) trong đoạn mã sau là gì?",
    codeSnippet: "class Counter:\n    count = 0  # Biến lớp\n    def __init__(self):\n        self.value = 0  # Biến thực thể",
    options: [
      "Biến thực thể dùng chung giữa mọi đối tượng, biến lớp thuộc riêng về từng đối tượng",
      "Biến lớp biểu thị trạng thái dùng chung của cả lớp, còn biến thực thể là trạng thái độc lập của từng đối tượng cụ thể",
      "Biến lớp chỉ có thể đọc, không thể thay đổi giá trị",
      "Biến thực thể yêu cầu khai báo kiểu dữ liệu tĩnh nghiêm ngặt",
    ],
    correctAnswerIndex: 1,
    explanation: "Biến lớp (`count`) tồn tại ở mức lớp chung và được chia sẻ bởi mọi đối tượng. Biến thực thể (`self.value`) thuộc riêng về từng đối tượng cụ thể được tạo ra từ lớp đó."
  },
  {
    id: 62,
    category: Category.RECURSION_OOP,
    questionText: "Phương thức tích hợp `isinstance(obj, class_or_tuple)` trong Python trả về giá trị gì?",
    options: [
      "Trả về tên lớp của đối tượng dưới dạng chuỗi kí tự",
      "Trả về True nếu đối tượng obj là một thực thể của lớp được kiểm tra (hoặc lớp con của nó), ngược lại trả về False",
      "Gây ra một Exception nếu obj không thuộc lớp tương ứng",
      "Tự động ép kiểu obj sang lớp được chỉ định",
    ],
    correctAnswerIndex: 1,
    explanation: "`isinstance` là hàm kiểm tra kiểu chuẩn, trả về True nếu thực thể thuộc lớp chỉ định hoặc các phân cấp kế thừa của lớp đó, giúp lập trình an toàn loại trừ lỗi sai kiểu."
  },
  {
    id: 63,
    category: Category.RECURSION_OOP,
    questionText: "Trong Đa kế thừa Python, MRO (Method Resolution Order) viết tắt của cụm từ gì và có vai trò gì?",
    options: [
      "Memory Reduction Option, dùng để tiết kiệm bộ nhớ",
      "Method Resolution Order, dùng để xác định thứ tự tìm kiếm phương thức khi có kế thừa phức tạp",
      "Module Registry Organizer, dùng để đăng ký thư viện",
      "Multiple Recursive Optimizer, phương pháp tối ưu đệ quy",
    ],
    correctAnswerIndex: 1,
    explanation: "MRO (Thứ tự Tìm kiếm Phương thức) là thuật toán (thường sử dụng C3 Linearization) chỉ rõ trình tự Python duyệt qua các lớp cha để tìm phương thức thích hợp khi được gọi."
  },
  {
    id: 64,
    category: Category.RECURSION_OOP,
    questionText: "Trong Python, phương thức đặc biệt `__add__` được định nghĩa trong đoạn mã trên dùng để hiện thực hóa kỹ thuật nào?",
    codeSnippet: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)",
    options: [
      "Nạp chồng phương thức (Method Overriding)",
      "Nạp chồng toán tử cộng (Operator Overloading) cho hai đối tượng Point",
      "Ép kiểu đối tượng Point thành số nguyên",
      "Tăng chỉ mục của mảng tự động",
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `__add__` cho phép định nghĩa lại cách hoạt động của toán tử cộng (`+`) khi áp dụng lên các đối tượng tự định nghĩa như Point, làm mã nguồn trực quan hơn."
  },
  {
    id: 65,
    category: Category.RECURSION_OOP,
    questionText: "Sự khác biệt căn bản giữa hai phương thức đặc biệt `__str__` và `__repr__` trong lập trình đối tượng Python là gì?",
    options: [
      "`__str__` hướng tới hiển thị giao diện đồ họa, `__repr__` hướng tới lưu trữ tệp tin",
      "`__str__` cung cấp cách biểu diễn thân thiện, dễ đọc cho người dùng; còn `__repr__` cung cấp biểu diễn chi tiết, phục vụ mục đích kiểm lỗi của giới phát triển",
      "Không có sự khác biệt, hai phương thức là bí danh tương đương của nhau",
      "`__str__` tự động được gọi định kỳ bởi Garbage Collector",
    ],
    correctAnswerIndex: 1,
    explanation: "`__str__` tạo chuỗi thân thiện khi dùng `print()` hoặc `str()`. `__repr__` tạo chuỗi thông tin định danh mang tính kỹ thuật, hữu ích cho debugging."
  },
  {
    id: 66,
    category: Category.RECURSION_OOP,
    questionText: "Phương thức được trang trí bằng `@staticmethod` trong Python có đặc trưng gì nổi bật?",
    options: [
      "Yêu cầu tham số đầu tiên bắt buộc phải là 'self'",
      "Yêu cầu tham số đầu tiên bắt buộc phải là 'cls'",
      "Không nhận bất kỳ tham số mặc định ngầm định nào (không có self hay cls), hoạt động như một hàm thông thường nằm trong namespace của lớp",
      "Không thể chứa các câu lệnh rẽ nhánh điều kiện",
    ],
    correctAnswerIndex: 2,
    explanation: "Static method là phương thức tĩnh độc lập không gắn chặt với thực thể hay lớp, không cần tham số `self` hay `cls`, dùng để gom nhóm các hàm tiện ích một cách logic."
  },
  {
    id: 67,
    category: Category.RECURSION_OOP,
    questionText: "Điểm khác biệt lớn nhất giữa việc sao chép nông (Shallow Copy) và sao chép sâu (Deep Copy) một danh sách đa cấp trong Python là gì?",
    options: [
      "Sao chép nông tốn bộ nhớ gấp đôi sao chép sâu",
      "Sao chép nông chỉ sao chép tham chiếu của các đối tượng con bên trong; trong khi sao chép sâu sao chép đệ quy để tạo ra các đối tượng con hoàn toàn độc lập",
      "Sao chép sâu chỉ áp dụng được đối với danh sách chứa các chuỗi kí tự",
      "Sao chép nông bảo đảm tính bất biến tuyệt đối của danh sách mới",
    ],
    correctAnswerIndex: 1,
    explanation: "Khi dùng copy nông, thay đổi trên đối tượng lồng bên trong sẽ tác động đến cả đối tượng gốc lẫn bản sao. Copy sâu (`copy.deepcopy`) nhân bản toàn bộ cấu trúc tạo nên sự độc lập tuyệt đối giữa 2 thực thể."
  },
  {
    id: 68,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã sau, kết quả hiển thị ra màn hình là gì?",
    codeSnippet: "lst = [10, 20, 30]\nprint(lst[1:])",
    options: [
      "A. [10, 20, 30]",
      "B. [20, 30]",
      "C. [20, 30, 40]",
      "D. [10, 20]",
    ],
    correctAnswerIndex: 1,
    explanation: "Kỹ thuật cắt lát (slicing) của Python: lst[1:] tức là cắt kể từ chỉ mục 1 (phần tử thứ nhì, có giá trị là 20) cho tới khi kết thúc danh sách. Bản cắt nhận được là [20, 30]."
  },
  {
    id: 69,
    category: Category.PYTHON_BASICS,
    questionText: "Cấu trúc tập hợp (set) trong Python sở hữu đặc tính quan trọng nào sau đây?",
    options: [
      "A. Cho phép chứa các phần tử trùng lặp và duy trì nghiêm ngặt thứ tự chèn phần tử.",
      "B. Không cho phép các phần tử trùng lặp và không đảm bảo duy trì thứ tự phần tử khi lưu trữ.",
      "C. Luôn giữ đúng thứ tự chèn phần tử giống như cấu trúc danh sách.",
      "D. Chỉ cho phép lưu trữ và xử lý các phần tử thuộc kiểu số nguyên.",
    ],
    correctAnswerIndex: 1,
    explanation: "Set trong Python dựa trên cơ chế Hash Table, không cho phép lưu giữ hai phần tử giống hệt nhau (mỗi phần tử chỉ tồn tại độc nhất một lần) và hoàn toàn không bảo toàn thứ tự sắp xếp lúc chèn vào phần tử."
  },
  {
    id: 70,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã nguồn Python sau, kết quả khi thực thi chương trình trên là gì?",
    codeSnippet: "y = 5\nprint(y > 0 and 10 / 0 == 0)",
    options: [
      "A. Chương trình in ra giá trị True.",
      "B. Chương trình in ra giá trị False.",
      "C. Gây ra lỗi ngoại lệ chia cho số không ZeroDivisionError.",
      "D. Báo lỗi cú pháp chương trình SyntaxError.",
    ],
    correctAnswerIndex: 2,
    explanation: "Cơ chế short-circuit evaluation của Python: với toán tử logic 'and', nếu vế trái là False thì kết quả lập tức là False mà không tính toán vế phải. Tuy nhiên ở đây, vế trái `y > 0` (5 > 0) được đánh giá là True, do đó Python bắt buộc phải nhảy tiếp sang vế phải `10 / 0 == 0` để đánh giá. Lúc này phép toán `10 / 0` thực hiện chia một số cho 0, lập tức phát sinh lỗi lúc chạy: ZeroDivisionError."
  },
  {
    id: 71,
    category: Category.FILES_LIBRARIES,
    questionText: "Khi mở tệp tin bằng cấu trúc `open('data.txt', 'w')` ghi dữ liệu, điều gì sẽ xảy ra nếu tệp tin `data.txt` đã tồn tại từ trước?",
    options: [
      "Nội dung mới được ghi tiếp vào cuối tệp cũ (Append)",
      "Kích hoạt lỗi FileExistsError và đóng chương trình",
      "Toàn bộ nội dung cũ bị xóa sạch và tệp được ghi mới từ đầu",
      "Tệp tin tự động chuyển sang chế độ chỉ đọc (Read-only)",
    ],
    correctAnswerIndex: 2,
    explanation: "Chế độ `'w'` (write) sẽ ghi đè lên tệp hiện hữu, đồng nghĩa xóa toàn bộ dữ liệu đang có trước khi tiến hành viết mới."
  },
  {
    id: 72,
    category: Category.PYTHON_BASICS,
    questionText: "Cho đoạn mã nguồn Python sau, kết quả hiển thị ra màn hình là gì?",
    codeSnippet: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
    options: [
      "A. [1, 2, 3]",
      "B. [1, 2, 3, 4]",
      "C. [4, 1, 2, 3]",
      "D. Chương trình báo lỗi vì b chỉ là một bản sao bất khả biến của a.",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong Python, phép gán `b = a` không tạo ra bản sao mới của đối tượng list trong bộ nhớ, mà chỉ đơn thuần tạo thêm một biến tham chiếu thứ hai `b` trỏ vào chung một vùng nhớ danh sách với `a`. Khi thực hiện sửa đổi qua `b.append(4)`, đối tượng chung bị thay đổi, dẫn đến in `a` ta cũng thấy giá trị mới [1, 2, 3, 4]."
  },
  {
    id: 73,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức `f.readlines()` (có chữ 's' ở cuối) trả về định dạng dữ liệu nào sau đây?",
    options: [
      "Một chuỗi chứa toàn bộ nội dung tệp tin",
      "Một List chứa các chuỗi, trong đó mỗi chuỗi tương ứng với một dòng văn bản trong tệp tin",
      "Một đối tượng iterator chỉ đọc",
      "Một số nguyên biểu diễn tổng số dòng",
    ],
    correctAnswerIndex: 1,
    explanation: "`readlines()` đọc mọi dòng trong tệp văn bản và trả về một danh sách (list) các chuỗi, mỗi chuỗi kết thúc bởi ký tự xuống dòng `\\n`."
  },
  {
    id: 74,
    category: Category.PYTHON_BASICS,
    questionText: "Trong Python, hàm nhập dữ liệu input() luôn trả về giá trị mặc định thuộc kiểu dữ liệu nào?",
    options: [
      "A. int",
      "B. float",
      "C. str",
      "D. bool",
    ],
    correctAnswerIndex: 2,
    explanation: "Hàm mặc định `input()` dùng để đọc các ký tự nhập từ bàn phím và luôn trả về kết quả dưới dạng một chuỗi ký tự (string - str). Muốn sử dụng dưới dạng số cần tiến hành ép kiểu cụ thể, ví dụ `int(input())`."
  },
  {
    id: 75,
    category: Category.FILES_LIBRARIES,
    questionText: "Tại sao việc sử dụng khối lệnh `with open(...) as f:` được coi là chuẩn thiết kế (best practice) khi làm việc với tệp tin?",
    options: [
      "Vì nó giúp tăng tốc độ đọc tệp gấp 10 lần",
      "Vì nó tự động giải phóng tài nguyên và đóng tệp tin một cách an toàn kể cả khi xảy ra lỗi đột ngột",
      "Vì nó bắt buộc tệp tin phải được mã hóa trước khi ghi",
      "Vì nó vô hiệu hóa các lỗi bảo mật thuộc hệ điều hành",
    ],
    correctAnswerIndex: 1,
    explanation: "Cấu trúc `with` đóng vai trò là một Context Manager, tự động kiểm soát việc đóng tệp an toàn (gọi phương thức close) ngay khi dòng lệnh thoát khỏi khối lệnh."
  },
  {
    id: 76,
    category: Category.FILES_LIBRARIES,
    questionText: "Thư viện tích hợp nào trong Python được thiết kế để xử lý đọc/ghi các bảng dữ liệu được phân tách bằng dấu phẩy?",
    options: [
      "json",
      "csv",
      "math",
      "sys",
    ],
    correctAnswerIndex: 1,
    explanation: "Mô-đun `csv` của thư viện chuẩn Python cung cấp đầy đủ các lớp và phương thức tối ưu chuyên dụng để xử lý tệp CSV."
  },
  {
    id: 77,
    category: Category.FILES_LIBRARIES,
    questionText: "Để xác định xem một đường dẫn tệp tin hoặc thư mục có thực sự tồn tại trên ổ đĩa hay không, bạn sử dụng phương thức nào trong thư viện `os`?",
    options: [
      "os.path.isfile()",
      "os.path.exists()",
      "os.path.getsize()",
      "os.path.dirname()",
    ],
    correctAnswerIndex: 1,
    explanation: "Phương thức `os.path.exists(path)` trả về True nếu đường dẫn trỏ tới một tệp tin hoặc thư mục thực tế đang hiện hữu trên hệ thống."
  },
  {
    id: 78,
    category: Category.FILES_LIBRARIES,
    questionText: "Cho biểu thức `math.ceil(3.2)` và `math.floor(3.8)`. Kết quả trả về của hai biểu thức này lần lượt là gì?",
    options: [
      "3 và 4",
      "4 và 3",
      "3.2 và 3.8",
      "4 và 4",
    ],
    correctAnswerIndex: 1,
    explanation: "`math.ceil(x)` trả về số nguyên nhỏ nhất lớn hơn hoặc bằng x (làm tròn lên ➔ 4). `math.floor(x)` trả về số nguyên lớn nhất nhỏ hơn hoặc bằng x (làm tròn xuống ➔ 3)."
  },
  {
    id: 79,
    category: Category.FILES_LIBRARIES,
    questionText: "Hàm sinh số ngẫu nhiên `random.randint(1, 10)` có đặc điểm biên thế nào?",
    options: [
      "Sinh số ngẫu nhiên từ 1 đến 9 (không bao gồm 10)",
      "Sinh số ngẫu nhiên từ 2 đến 10 (không bao gồm 1)",
      "Sinh số ngẫu nhiên từ 1 đến 10 (bao gồm cả 1 và 10)",
      "Chỉ sinh ra số thực trong khoảng từ 1.0 đến 10.0",
    ],
    correctAnswerIndex: 2,
    explanation: "Khác với cơ chế khoảng nửa mở của range hay slicing, hàm `random.randint(a, b)` lấy ngẫu nhiên số nguyên trong khoảnh đóng kín bao gồm cả hai cận đầu mút `a` và `b`."
  },
  {
    id: 80,
    category: Category.FILES_LIBRARIES,
    questionText: "Cú pháp import nào dưới đây cho phép bạn gọi trực tiếp hàm `sqrt()` mà không cần viết tên thư viện `math` ở phía trước?",
    options: [
      "import math.sqrt",
      "from math import sqrt",
      "import sqrt from math",
      "load math.sqrt",
    ],
    correctAnswerIndex: 1,
    explanation: "Cấu trúc `from math import sqrt` đưa trực tiếp hàm `sqrt` vào namespace toàn cục hiện tại, cho phép gọi ngắn gọn `sqrt(x)` trực tiếp."
  },
  {
    id: 81,
    category: Category.FILES_LIBRARIES,
    questionText: "Sự khác biệt cốt lõi về mặt tham số nguồn nhận vào giữa hai phương thức `json.loads()` và `json.load()` là gì?",
    options: [
      "`json.loads` xử lý tệp văn bản, `json.load` xử lý biến số",
      "`json.loads` nhận vào một chuỗi (string) định dạng JSON; trong khi `json.load` nhận vào một đối tượng tệp tin (file object) đang mở",
      "Hai phương thức hoàn toàn đồng nhất",
      "`json.loads` chỉ lấy các giá trị số thực từ dữ liệu",
    ],
    correctAnswerIndex: 1,
    explanation: "Chữ 's' trong 'loads' viết tắt của 'string' (load từ string JSON). Đối với tệp tin đang mở, ta dùng `json.load(file_object)`."
  },
  {
    id: 82,
    category: Category.FILES_LIBRARIES,
    questionText: "Trong thư viện `sys`, phần tử `sys.argv[0]` luôn chứa thông tin gì?",
    options: [
      "Số lượng tham số dòng lệnh truyền vào",
      "Tên của tệp tin script Python đang được thực thi",
      "Tham số tùy chọn đầu tiên của người dùng",
      "Dung lượng bộ nhớ RAM mà Python đang sử dụng",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong danh sách tham số dòng lệnh `sys.argv`, phần tử đầu tiên tại chỉ mục 0 chứa đường dẫn hoặc tên của chính tệp tin kịch bản Python đang chạy."
  },
  {
    id: 83,
    category: Category.FILES_LIBRARIES,
    questionText: "Để làm việc với các tệp tin phi văn bản như hình ảnh hoặc tệp nén, ta cần mở tệp với chế độ (mode) nào dưới đây?",
    options: [
      "'r'",
      "'rb'",
      "'w'",
      "'rt'",
    ],
    correctAnswerIndex: 1,
    explanation: "Hệ thống phân biệt tệp văn bản và tệp nhị phân thông qua hậu tố `'b'` (binary). 'rb' đại diện cho việc đọc tệp nhị phân thô mà không áp dụng bộ mã hóa ký tự nào."
  },
  {
    id: 84,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức nào trong mô-đun `datetime` được dùng để chuyển đổi một đối tượng thời gian thành một chuỗi văn bản định dạng tùy biến theo ý người dùng?",
    options: [
      "strptime()",
      "strftime()",
      "format_str()",
      "to_string()",
    ],
    correctAnswerIndex: 1,
    explanation: "Chữ 'f' trong `strftime` viết tắt của 'format' (định dạng thời gian thành string). Hàm ngược lại chuyển chuỗi thành đối tượng thời gian là `strptime` ('p' biểu thị 'parse')."
  },
  {
    id: 85,
    category: Category.ALGORITHMS,
    questionText: "Đối với thuật toán sắp xếp chọn (Selection Sort), sau lượt lặp của vòng lặp ngoài đầu tiên (outer loop) với mảng sắp xếp tăng dần, phần tử nào sau đây chắc chắn sẽ nằm ở đúng vị trí đích?",
    options: [
      "A. Phần tử có giá trị nhỏ nhất trong toàn bộ danh sách.",
      "B. Phần tử có giá trị lớn nhất trong toàn bộ danh sách.",
      "C. Phần tử nằm ở vị trí chính giữa danh sách.",
      "D. Không có phần tử nào chắc chắn nằm ở đúng vị trí đích.",
    ],
    correctAnswerIndex: 0,
    explanation: "Ý tưởng của Sắp xếp chọn (Selection Sort) tăng dần: ở bước lặp ngoài thứ i, thuật toán rà quét trong toàn mảng con chưa sắp xếp để tìm phần tử nhỏ nhất tuyệt đối và hoán vị nó với vị trí đầu tiên của mảng con đó. Lượt lặp đầu tiên (i=0) tìm phần tử nhỏ nhất toàn bộ danh sách và hoán đổi về chỉ mục 0, nên phần tử nhỏ nhất sẽ chắc chắn đứng đúng vị trí đích cuối cùng."
  },
  {
    id: 86,
    category: Category.FILES_LIBRARIES,
    questionText: "Lệnh `f.seek(0)` trên một tệp tin đang mở có tác dụng gì?",
    options: [
      "Tìm kiếm ký tự '0' ở trong tệp tin",
      "Xóa toàn bộ nội dung của tệp tin",
      "Di chuyển con trỏ vị trí đọc/ghi về điểm bắt đầu của tệp tin",
      "Đóng tệp tin ngay lập tức",
    ],
    correctAnswerIndex: 2,
    explanation: "Phương thức `seek(offset)` chỉnh sửa vị trí hiện tại của con trỏ tệp. `seek(0)` định vị con trỏ lại đầu tệp để có thể đọc hoặc ghi lại dòng dữ liệu từ đầu."
  },
  {
    id: 87,
    category: Category.FILES_LIBRARIES,
    questionText: "Khi bạn cố mở một tệp tin không tồn tại bằng chế độ đọc `'r'`, Python sẽ kích hoạt lỗi ngoại lệ nào?",
    options: [
      "FileExistsError",
      "FileNotFoundError",
      "IOError",
      "KeyError",
    ],
    correctAnswerIndex: 1,
    explanation: "Khi tệp tin được chỉ định tìm kiếm để mở không xuất hiện ở thư mục mục tiêu, hệ thống ném ra ngoại lệ `FileNotFoundError` kế thừa từ `OSError`."
  },
  {
    id: 88,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức nào dùng để ghi danh sách các chuỗi dòng văn bản vào file nhanh chóng mà không cần chèn ký tự phân tách thủ công bằng vòng lặp?",
    options: [
      "f.write()",
      "f.writelines()",
      "f.print_all()",
      "f.write_array()",
    ],
    correctAnswerIndex: 1,
    explanation: "`f.writelines(sequence)` nhận vào một iterable chứa các chuỗi và ghi chúng tuần tự vào tệp tin mà không tạo thêm ký tự xuống dòng tự động."
  },
  {
    id: 89,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức nào trong thư viện `os` cho biết đường dẫn hiện tại của thư mục làm việc (Working directory) của chương trình?",
    options: [
      "os.path.curdir()",
      "os.getcwd()",
      "os.chdir()",
      "os.list_dir()",
    ],
    correctAnswerIndex: 1,
    explanation: "`os.getcwd()` đại diện cho 'get current working directory', trả về đường dẫn tuyệt đối của thư mục làm việc hiện thời của tiến trình Python."
  },
  {
    id: 90,
    category: Category.ALGORITHMS,
    questionText: "Phát biểu nào mô tả đúng nhất về nguyên lý hoạt động của thuật toán sắp xếp nổi bọt (Bubble Sort)?",
    options: [
      "A. Liên tục tìm kiếm phần tử có giá trị nhỏ nhất của mảng chưa sắp xếp và hoán đổi đưa lên đầu danh sách.",
      "B. Chia danh sách cần sắp xếp thành hai nửa bằng nhau, tiến hành sắp xếp đệ quy từng nửa rồi thực hiện trộn (merge) lại.",
      "C. Liên tục so sánh và hoán đổi các phần tử kề nhau nếu chúng bị sai thứ tự sắp xếp mong muốn, đẩy dần các phần tử lớn dần về vị trí cuối danh sách sau mỗi vòng quét.",
      "D. Luôn thực hiện chọn một phần tử làm chốt (pivot), phân hoạch mảng thành hai phần lớn và nhỏ hơn chốt rồi tiến hành đệ quy.",
    ],
    correctAnswerIndex: 2,
    explanation: "Sắp xếp nổi bọt (Bubble Sort) hoạt động bằng cách làm việc liên tục: so sánh các cặp lân cận kế tiếp nhau; nếu cặp đó lộn xộn (ví dụ trái lớn hơn phải khi xếp tăng), nó đổi chỗ chúng. Qua mỗi hành trình duyệt mảng đầy đủ, phần tử lớn nhất còn lại sẽ 'nổi' dần lên đúng đáy mảng như bọt khí."
  },
  {
    id: 91,
    category: Category.FILES_LIBRARIES,
    questionText: "Cú pháp `import pandas as pd` đại diện cho kỹ thuật nào trong lập trình mô-đun Python?",
    options: [
      "Bắt buộc đóng gói thư viện",
      "Độc quyền hóa biến cục bộ",
      "Đặt bí danh đặt tên (Alias) cho thư viện để gọi danh ngắn gọn và tránh xung đột tên",
      "Chạy thư viện ở chế độ bảo mật cao",
    ],
    correctAnswerIndex: 2,
    explanation: "Từ khóa `as` thiết lập một bí danh viết tắt giúp viết mã nguồn gọn mắt hơn và tối ưu tiến độ viết mã (ví dụ thay vì dùng pandas.DataFrame ta dùng pd.DataFrame)."
  },
  {
    id: 92,
    category: Category.RECURSION_OOP,
    questionText: "Xét hàm đệ quy sau, chương trình hiển thị kết quả nào sau đây ra màn hình?",
    codeSnippet: "def f(n):\n    if n <= 1:\n        return 1\n    return f(n - 1) + f(n - 2)\n\nprint(f(4))",
    options: [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 8",
    ],
    correctAnswerIndex: 2,
    explanation: "Đây là cấu trúc sinh số Fibonacci:\n- f(0) = f(1) = 1.\n- f(2) = f(1) + f(0) = 1 + 1 = 2.\n- f(3) = f(2) + f(1) = 2 + 1 = 3.\n- f(4) = f(3) + f(2) = 3 + 2 = 5.\nVậy print(f(4)) in ra kết quả là 5."
  },
  {
    id: 93,
    category: Category.FILES_LIBRARIES,
    questionText: "Cách tốt nhất để tạo các thư mục phân cấp sâu lồng vào nhau (ví dụ: 'dir1/dir2/dir3') mà không lo bị lỗi nếu thư mục cha chưa tồn tại là gì?",
    options: [
      "os.mkdir('dir1/dir2/dir3')",
      "os.makedirs('dir1/dir2/dir3', exist_ok=True)",
      "os.system('mkdir dir1')",
      "Tự động tạo thủ công bằng giao diện trước",
    ],
    correctAnswerIndex: 1,
    explanation: "`os.makedirs` hỗ trợ tạo thư mục đệ quy đa cấp. Việc đặt `exist_ok=True` ngăn chặn lỗi ném ra nếu thư mục đích đã tồn tại."
  },
  {
    id: 94,
    category: Category.FILES_LIBRARIES,
    questionText: "Phương thức nào thuộc thư viện `os` được dùng để lấy dung lượng của tệp tin theo đơn vị byte?",
    options: [
      "os.path.getsize(path)",
      "os.path.size(path)",
      "os.path.length(path)",
      "os.path.bytes(path)",
    ],
    correctAnswerIndex: 0,
    explanation: "`os.path.getsize(path)` trả về kích thước chính xác của tệp tại đường dẫn chỉ định bằng đơn vị byte, hữu ích cho tính toán lưu trữ."
  },
  {
    id: 95,
    category: Category.DEBUGGING_TESTING,
    questionText: "Giả sử bạn định nghĩa một hàm tính trung bình cộng như sau:\n\ndef avg(a, b):\n    return (a + b) / 2\n\nKhẳng định kiểm thử (test case) nào sau đây có khả năng phát hiện lỗi lập trình tốt nhất nếu ai đó sửa nhầm công thức tính toán bên trong thành (a + b) / 3?",
    options: [
      "A. assert avg(2, 4) == 2",
      "B. assert avg(2, 4) == 3",
      "C. assert avg(0, 0) == 0",
      "D. assert avg(-1, 1) == 0",
    ],
    correctAnswerIndex: 1,
    explanation: "Hãy phân tích:\n- Với hàm đúng: avg(2, 4) = (2+4)/2 = 3. Với hàm lỗi: avg(2, 4) = (2+4)/3 = 2.\n- Nếu dùng `assert avg(2,4) == 3`: Với hàm đúng chạy qua êm xuôi. Với hàm lỗi, avg(2,4) bằng 2, phép so sánh `2 == 3` trả về False, ném lỗi AssertionError lập tức giúp ta phát hiện ra có bug trong hàm!\n- Trái lại, các khẳng định C và D đều trả về 0 ở cả hai phiên bản đúng/lỗi, nên không phát hiện ra bug."
  },
  {
    id: 96,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khi bạn viết thiếu dấu hai chấm `:` ở cuối câu lệnh điều kiện `if`, Python sẽ báo lỗi thuộc loại nào?",
    options: [
      "TypeError",
      "SyntaxError (Lỗi cú pháp)",
      "IndentationError",
      "ValueError",
    ],
    correctAnswerIndex: 1,
    explanation: "Lỗi thiếu ký tự theo quy định ngữ pháp cốt lõi của ngôn ngữ thuộc nhóm `SyntaxError`. Nó ngăn cản trình thông dịch xây dựng cây phân tích cú pháp chương trình."
  },
  {
    id: 97,
    category: Category.DEBUGGING_TESTING,
    questionText: "Lỗi ngoại lệ nào được kích hoạt khi câu lệnh kiểm định điều kiện logic `assert` bị thất bại (trả về False)?",
    options: [
      "ValueError",
      "AssertionError",
      "RuntimeError",
      "SystemError",
    ],
    correctAnswerIndex: 1,
    explanation: "Câu lệnh `assert condition` bảo đảm điều kiện kiểm tra luôn đúng. Nếu điều kiện sai, Python tự động kích hoạt ngoại lệ `AssertionError` để cảnh báo."
  },
  {
    id: 98,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trường hợp nào dưới đây sẽ gây ra một lỗi `ValueError` trong thời gian chạy (Runtime)?",
    options: [
      "Cố gắng thực hiện chia một số cho 0",
      "Chuyển đổi chuỗi không chứa ký tự số thành kiểu số nguyên, ví dụ: `int('hello')`",
      "Sử dụng chỉ mục nằm ngoài phạm vi danh sách",
      "Gọi một thuộc tính không xuất hiện trong đối tượng",
    ],
    correctAnswerIndex: 1,
    explanation: "`ValueError` xuất hiện khi hàm nhận được đối số có kiểu dữ liệu đúng nhưng giá trị số của đối số không hợp lệ cho phép chuyển đổi thực tế."
  },
  {
    id: 99,
    category: Category.DEBUGGING_TESTING,
    questionText: "Ngoại lệ `ZeroDivisionError` nảy sinh khi nào trong chương trình?",
    options: [
      "Khi bạn nhân một số với số 0",
      "Khi thực hiện các phép chia cho số 0 (ví dụ `10 / 0`)",
      "Khi khởi tạo một biến có giá trị ban đầu bằng 0",
      "Khi kết quả của hàm toán học vượt qua giới hạn số lớn",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong toán học và lập trình máy tính, phép chia cho số 0 là không xác định. Trình thông dịch phát hiện mẫu số bằng 0 sẽ dừng chương trình và ném lỗi `ZeroDivisionError`."
  },
  {
    id: 100,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khi cố truy cập một phần tử ở chỉ mục thứ 10 trong một danh sách chỉ có 5 phần tử, lỗi nào sẽ phát sinh?",
    options: [
      "IndexError",
      "KeyError",
      "ValueError",
      "TypeError",
    ],
    correctAnswerIndex: 0,
    explanation: "Mọi nỗ lực truy xuất chỉ mục tuần tự nằm ngoài khoảng quản lý hợp lệ của chuỗi hay danh sách đều trực tiếp kích hoạt lỗi `IndexError`."
  },
  {
    id: 101,
    category: Category.ALGORITHMS,
    questionText: "Trong bốn thành phần chính của Tư duy Tính toán, kỹ thuật 'Trừu tượng hóa' (Abstraction) được định nghĩa là gì?",
    options: [
      "A. Việc chia một vấn đề lớn, phức tạp thành các bài toán/phần nhỏ hơn để dễ dàng quản lý.",
      "B. Việc tập trung hoàn toàn vào các đặc trưng mấu chốt, quan trọng nhất của vấn đề và ẩn đi các chi tiết nhỏ lẻ, không cần thiết hoặc phức tạp ngoài luồng khác.",
      "C. Quá trình thiết kế một chuỗi các chỉ dẫn tự động từng bước cho máy tính.",
      "D. Việc tìm kiếm các điểm tương đồng hoặc các quy luật lặp lại trong một vấn đề.",
    ],
    correctAnswerIndex: 1,
    explanation: "Kỹ thuật 'Trừu tượng hóa' (Abstraction) dạy ta giấu đi các chi tiết triển khai rườm rà dưới cấp, chỉ giữ lại giao diện hành vi cốt lõi và quan trọng nhất để giúp trí tuệ con người giảm tải độ phức tạp tư duy, tập trung giải quyết vấn đề mô hình."
  },
  {
    id: 102,
    category: Category.ALGORITHMS,
    questionText: "Trong bốn thành phần chính của Tư duy Tính toán, kỹ thuật 'Nhận dạng mẫu' (Pattern Recognition) nghĩa là gì?",
    options: [
      "A. Quá trình phân tích mã nguồn và tô màu cú pháp (syntax highlighting).",
      "B. Tìm kiếm những điểm tương đồng, sự lặp lại hay xu hướng quy luật trong hoặc giữa các vấn đề để kế thừa hoặc đề xuất giải pháp có tính hệ thống.",
      "C. Việc viết một thuật toán rẽ nhánh để so sánh hai chuỗi ký tự.",
      "D. Chạy chương trình kiểm thử nhiều lần để so sánh sự thay đổi của biến đếm.",
    ],
    correctAnswerIndex: 1,
    explanation: "Nhận dạng mẫu (Pattern Recognition) giúp ta nhận biết: Một khó khăn trước mặt liệu có điểm chung nào với các bài toán ta từng giải trong quá khứ không? Việc nhận diện xu hướng quy luật này giúp tối ưu hóa thuật toán cực kỳ tốt."
  },
  {
    id: 103,
    category: Category.ALGORITHMS,
    questionText: "Trong bốn thành phần chính của Tư duy Tính toán, 'Thiết kế thuật toán' (Algorithm Design) nghĩa là gì?",
    options: [
      "A. Quá trình cài đặt và tải các thư viện ngoài như Pandas hay Matplotlib.",
      "B. Việc tạo ra một chuỗi các hướng dẫn hoặc quy tắc logic từng bước một để giải quyết vấn đề tự động.",
      "C. Việc viết lại toàn bộ mã nguồn chương trình từ đầu dưới dạng các hàm đệ quy.",
      "D. Quá trình tối ưu hóa các thuộc tính khởi tạo ban đầu của một đối tượng.",
    ],
    correctAnswerIndex: 1,
    explanation: "Thiết kế thuật toán (Algorithm Design) là bước lập trình chuỗi các hành động tuần tự rõ ràng, khả thi để máy tính hoặc con người có thể làm và thu được kết quả mong muốn một cách nhất quán bất kể thông số dữ liệu."
  },
  {
    id: 104,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian trong trường hợp tốt nhất (best-case) của giải thuật Sắp xếp chèn (Insertion Sort) là bao nhiêu?",
    options: [
      "A. O(1)",
      "B. O(n) khi danh sách đầu vào đã được sắp xếp hoàn toàn từ trước.",
      "C. O(n log n)",
      "D. O(n^2)",
    ],
    correctAnswerIndex: 1,
    explanation: "Trong trường hợp mảng đưa vào đã được sắp xếp hoàn hảo, Sắp xếp chèn (Insertion Sort) chỉ cần thực hiện so sánh duy nhất mỗi phần tử mới với phần tử liền kề bên trái của nó mà không bao giờ cần hoán vị hay dịch chuyển mảng con. Độ phức tạp chạy hết tuyến tính O(n)."
  },
  {
    id: 105,
    category: Category.ALGORITHMS,
    questionText: "Thuật toán sắp xếp nào sau đây áp dụng chiến lược thiết kế giải thuật 'Chia để trị' (Divide and Conquer) một cách điển hình nhất?",
    options: [
      "A. Bubble Sort",
      "B. Selection Sort",
      "C. Insertion Sort",
      "D. Merge Sort",
    ],
    correctAnswerIndex: 3,
    explanation: "Merge Sort (Sắp xếp trộn) là triết lý Chia để trị hoàn hảo: Chia danh sách dài ra làm hai nửa bằng nhau cho đến khi mảng chỉ còn 0 hoặc 1 phần tử (đứng một mình thì mặc định xếp xong); sau đó gộp đối xứng liên tiếp các nửa này theo thuật toán Trộn hai mảng đã sắp để tạo nên sản phẩm cuối cùng."
  },
  {
    id: 106,
    category: Category.DEBUGGING_TESTING,
    questionText: "Lớp cơ sở chính thống để thiết lập các ca kiểm thử trong thư viện chuẩn `unittest` của Python là gì?",
    options: [
      "unittest.TestCase",
      "unittest.TestClass",
      "unittest.Suite",
      "unittest.Tester",
    ],
    correctAnswerIndex: 0,
    explanation: "Để tạo một ca kiểm thử trong Python, chúng ta cần sinh một lớp kế thừa từ `unittest.TestCase`, cung cấp các phương thức khẳng định assert tích hợp."
  },
  {
    id: 107,
    category: Category.DEBUGGING_TESTING,
    questionText: "Phương thức Assertion nào hay được dùng nhất trong unit test để xác định kết quả thực tế trùng khớp với giá trị kỳ vọng?",
    options: [
      "assertTrue(a)",
      "assertEqual(a, b)",
      "assertIsNone(x)",
      "assertMatch(a, b)",
    ],
    correctAnswerIndex: 1,
    explanation: "`assertEqual(实, 预)` so sánh tính bằng nhau của hai đối tượng thực tế và kỳ vọng, in ra báo cáo lỗi chi tiết nếu chúng lệch nhau."
  },
  {
    id: 108,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trong thiết kế kiểm thử phần mềm, ưu thế cốt lõi của kỹ thuật Phân tích giá trị biên (Boundary Value Analysis - BVA) là gì?",
    options: [
      "Kiểm tra ngẫu nhiên các kịch bản người dùng",
      "Tập trung kiểm thử tại các điểm giới hạn biên (như min, max, điểm chuyển tiếp) nơi lỗi logic dễ nảy sinh nhiều nhất",
      "Kiểm tra tính bảo mật mã hóa của hệ thống",
      "Đo lường thời gian đáp ứng tải của máy chủ",
    ],
    correctAnswerIndex: 1,
    explanation: "Kinh nghiệm thực tế cho thấy các lỗi phần mềm phân bố mật độ rất cao xung quanh các giá trị ranh giới đầu vào. BVA tập trung tài lực kiểm tra các ngưỡng sát biên này giúp nâng cao đáng kể xác suất phát hiện lỗi."
  },
  {
    id: 109,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khái niệm Phân vùng tương đương (Equivalence Partitioning - EP) trong kiểm thử phần mềm là gì?",
    options: [
      "Chia mã nguồn thành nhiều tệp thư mục song song",
      "Phân chia toàn bộ miền giá trị đầu vào thành các lớp dữ liệu tương đương nhau, sau đó đại diện chỉ cần chọn ra 1 giá trị của mỗi nhóm để đại diện kiểm tra",
      "Chạy kiểm thử trên nhiều cụm máy tính cùng lúc",
      "Mô phỏng cơ chế làm sạch bộ nhớ",
    ],
    correctAnswerIndex: 1,
    explanation: "EP phân nhóm các đầu vào có hành vi dự kiến tương đồng thành một phân vùng. Việc này giúp giảm số lượng ca kiểm thử cần thiết xuống mức tối ưu mà vẫn giữ trọn phạm vi bao phủ kiểm nghiệm danh mục đầu vào."
  },
  {
    id: 110,
    category: Category.DEBUGGING_TESTING,
    questionText: "Độ bao phủ câu lệnh (Statement Coverage) khác gì so với Độ bao phủ nhanh nhánh điều kiện (Branch/Decision Coverage)?",
    options: [
      "Statement Coverage bảo vệ mã nguồn tối ưu tốt hơn",
      "Statement Coverage đo đếm tỷ lệ các dòng mã đơn lẻ được chạy; còn Branch Coverage bảo đảm mọi lối rẽ điều kiện (đúng/sai) trong code đều được đi qua kiểm nghiệm thực tế",
      "Hai kỹ thuật là hoàn toàn tương ứng",
      "Branch Coverage chỉ đo lường được trong lập trình hướng đối tượng",
    ],
    correctAnswerIndex: 1,
    explanation: "Branch Coverage có tính toàn vẹn cao hơn. Chỉ số Statement có thể là 100% nhưng vẫn bỏ sót các nhánh rẽ điều kiện bị thiếu dữ liệu mô phỏng trong lúc thực thi thử."
  },
  {
    id: 111,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khối mã lệnh nằm trong phần `finally` của cấu trúc `try-except-finally` được thực hiện khi nào?",
    options: [
      "Chỉ khi có lỗi exception xảy ra trong try",
      "Chỉ khi không có bất kỳ lỗi nào xuất hiện trong quá trình chạy",
      "Luôn luôn được thực hiện ở mọi trường hợp (cho dù có lỗi xảy ra hay không)",
      "Chỉ khi lỗi không xử lý được bằng block except",
    ],
    correctAnswerIndex: 2,
    explanation: "Khối `finally` được bảo đảm thực thi tối cao bởi máy ảo Python sau khi kết thúc các luồng rẽ của try và except, rất phù hợp để giải phóng tài nguyên kết nối cơ sở dữ liệu hoặc đóng tệp."
  },
  {
    id: 112,
    category: Category.DEBUGGING_TESTING,
    questionText: "Mục tiêu cốt lõi của Kiểm thử tích hợp (Integration Testing) là gì?",
    options: [
      "Đo đạc kiểm nghiệm hiệu năng CPU khi vận hành",
      "Kiểm tra sự tương tác, kết nối truyền dữ liệu và phối hợp ăn ý giữa các thành phần/mô-đun phần mềm riêng lẻ khi ghép nối lại với nhau",
      "So sánh tốc độ các ngôn ngữ lập trình khác nhau",
      "Viết lại toàn bộ mã nguồn theo chuẩn thiết kế mới",
    ],
    correctAnswerIndex: 1,
    explanation: "Unit test chỉ chứng minh các mảnh ghép chạy tốt đơn lẻ. Kiểm thử tích hợp ráp nối chúng lại để xác thực tổng thể thông luồng tín hiệu và dữ liệu qua các điểm giao tiếp."
  },
  {
    id: 113,
    category: Category.DEBUGGING_TESTING,
    questionText: "Kiểm thử hồi quy (Regression Testing) được tiến hành nhằm phục vụ nhiệm vụ gì chính yếu?",
    options: [
      "Kiểm tra phần mềm khi chạy lùi về các phiên bản cũ",
      "Xác thực xem các thay đổi, sửa lỗi hay tính năng mới vừa thêm vào có gây lỗi hoặc làm hư hỏng các chức năng đang hoạt động bình thường trước đó hay không",
      "Tối ưu hóa dung lượng file cài đặt",
      "Kiểm tra lỗi đệ quy vô hạn",
    ],
    correctAnswerIndex: 1,
    explanation: "Mỗi khi sửa đổi code, các hệ thống phụ trợ rất dễ bị lỗi dây chuyền. Hồi quy chạy lại hệ thống ca kiểm thử để bảo đảm tính ổn định không suy giảm sau sửa đổi."
  },
  {
    id: 114,
    category: Category.DEBUGGING_TESTING,
    questionText: "Sự khác biệt cốt lõi nhất giữa Kiểm thử Hộp đen (Black-box) và Kiểm thử Hộp trắng (White-box) là gì?",
    options: [
      "Hộp đen chỉ chạy trên Linux, Hộp trắng chỉ chạy trên Windows",
      "Hộp đen dựa hoàn toàn vào yêu cầu chức năng bên ngoài mà không quan tâm code bên trong; Hộp trắng dựa vào sự am hiểu cấu trúc mã nguồn bên trong để viết ca kiểm thử",
      "Hộp trắng có độ an toàn bảo mật cao hơn",
      "Hộp đen chỉ được phép chạy thủ công không dùng tool tự động",
    ],
    correctAnswerIndex: 1,
    explanation: "Black-box coi phần mềm là một chiếc hộp đen kín xem xét ngõ vào ra. White-box mở rộng nhìn thấu thuật toán, cấu trúc rẽ nhánh bên trong để tối ưu các đường thực thi dòng lệnh."
  },
  {
    id: 115,
    category: Category.DEBUGGING_TESTING,
    questionText: "Kiểm duyệt mã nguồn (Code Inspection/Review) khác biệt cơ bản nào với Kiểm thử động (Dynamic Testing)?",
    options: [
      "Inspection tốn nhiều băng thông mạng Internet hơn",
      "Inspection là kiểm thử tĩnh phân tích mã nguồn thủ công hoặc bằng phân tích tĩnh mà không chạy chương trình; còn Dynamic Testing yêu cầu chương trình thực sự hoạt động",
      "Dynamic Testing chỉ sờ được vào cơ sở dữ liệu",
      "Không có khác biệt, hai cụm từ là tương đương",
    ],
    correctAnswerIndex: 1,
    explanation: "Review/Inspection là tìm lỗi thụ động trên văn bản nguồn tĩnh. Dynamic Testing đưa chương trình vào môi trường chạy thật, cung cấp đối số biến động và đo đạc kết quả thực tế."
  },
  {
    id: 116,
    category: Category.DEBUGGING_TESTING,
    questionText: "Khi nào là kịch bản thích hợp để sử dụng câu lệnh `assert` trong mã nguồn sản phẩm thực tế?",
    options: [
      "Dùng để kiểm soát và bắt các lỗi thông thường do người dùng nhập sai",
      "Dùng để kiểm thử nội bộ trạng thái bất biến của thuật toán hoặc giả định kỹ thuật bắt buộc phải đúng trong quá trình phát triển hệ thống",
      "Dùng để ghi nhật ký hành vi người dùng",
      "Dùng thay thế hoàn toàn khối lệnh `try...except` để chương trình có hiệu năng cao hơn",
    ],
    correctAnswerIndex: 1,
    explanation: "Assert nên dùng làm chốt chặn bảo vệ các giả định cấu trúc bên trong (internal invariant). Không dùng assert hứng lỗi từ người dùng vì assert có thể bị trình biên dịch tối ưu hóa tắt bỏ hoàn toàn (chế độ -O)."
  },
  {
    id: 117,
    category: Category.DEBUGGING_TESTING,
    questionText: "Tại sao nên hạn chế tối đa việc bắt lỗi bằng khối lệnh tổng chung `except Exception:` chung chung?",
    options: [
      "Vì nó làm chương trình chạy chậm lại 100 lần",
      "Vì nó che giấu đi mọi lỗi hệ thống bất thường ngoài dự kiến (kể cả lỗi chính tả gõ sai biến), làm việc phát hiện và sửa bug (debugging) trở nên cực kỳ khó khăn",
      "Vì Python không hỗ trợ cú pháp này ở v3+",
      "Vì nó sẽ tự động xóa file log",
    ],
    correctAnswerIndex: 1,
    explanation: "Cú pháp chung chung `except Exception:` bắt trọn tất cả sai hỏng kể cả lỗi bộ nhớ hay lỗi đặt tên sai, gây mù thông tin báo lỗi đúng bản chất của sự cố thực tế nảy sinh."
  },
  {
    id: 118,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trường hợp nào dưới đây sẽ kích hoạt lỗi runtime loại `TypeError`?",
    options: [
      "Truy cập vào key không có sẵn trong dict",
      "Cố gắng thực hiện tính toán phép cộng giữa kiểu số nguyên và kiểu chuỗi ký tự, ví dụ: `5 + '10'`",
      "Truyền chỉ mục âm quá giới hạn chiều dài danh sách",
      "Khởi tạo một class không đúng định danh MRO",
    ],
    correctAnswerIndex: 1,
    explanation: "`TypeError` nảy sinh khi áp dụng các toán tử hoặc hàm số lên các đối tượng có kiểu dữ liệu không đáp ứng được phép toán tương thích thực tế."
  },
  {
    id: 119,
    category: Category.DEBUGGING_TESTING,
    questionText: "Trong Python, lỗi ngoại lệ `KeyError` phát sinh trong tình huống cụ thể nào?",
    options: [
      "Khi bạn chỉ định một chỉ mục sai cho một Tuple",
      "Khi cố truy cập một khóa (Key) không tồn tại trong cấu trúc dữ liệu Dictionary",
      "Khi hàm khởi tạo nhận đối số trùng tên khóa",
      "Khi tệp cấu hình JSON bị lỗi mã hóa khóa bảo mật",
    ],
    correctAnswerIndex: 1,
    explanation: "Nếu tra cứu một Dictionary bằng cú pháp ngoặc vuông `my_dict[key]` mà khóa đó không tồn tại trong tập hợp lưu trữ của từ điển, Python sẽ ném ngoại lệ `KeyError`."
  },
  {
    id: 120,
    category: Category.DEBUGGING_TESTING,
    questionText: "Lỗi `AttributeError` xuất hiện khi nào trong một chương trình Python?",
    options: [
      "Khi có lỗi thụt lề đầu dòng không đồng bộ",
      "Khi cố gắng gọi một phương thức hoặc thuộc tính không tồn tại của một đối tượng cụ thể",
      "Khi tham số truyền vào hàm bị sai kiểu giá trị",
      "Khi một tệp tin đang ghi bị ngắt kết nối vật lý",
    ],
    correctAnswerIndex: 1,
    explanation: "Khi tham chiếu hoặc thao tác một thuộc tính của đối tượng (ví dụ: `my_string.append()` trong khi string không có phương thức append), Python sẽ phát lỗi `AttributeError`."
  },
  {
    id: 121,
    category: Category.ALGORITHMS,
    questionText: "Độ phức tạp thời gian trong trường hợp trung bình (average-case) của thuật toán Sắp xếp nhanh (Quick Sort) là bao nhiêu?",
    options: [
      "A. O(n)",
      "B. O(n log n)",
      "C. O(n^2)",
      "D. O(log n)",
    ],
    correctAnswerIndex: 1,
    explanation: "Quick Sort hoạt động dựa trên phân hoạch mảng xung quanh một chốt pivot. Trung bình, phân hoạch chia mảng làm đôi giúp đạt chiều sâu rẽ nhánh log n, tại mỗi tầng thực hiện xử lý tuyến tính O(n) để hoán đổi. Cho kết quả O(n log n). Trường hợp xấu nhất Quick Sort mới chạm ngưỡng O(n^2) nếu mảng bị mất cân bằng trầm trọng."
  },
  {
    id: 122,
    category: Category.DEBUGGING_TESTING,
    questionText: "Vật thể giả lập (Mock Objects) được dùng để làm gì trong hoạt động viết Unit Test?",
    options: [
      "Tăng kích thước tệp cài đặt để che giấu mã nguồn",
      "Thay thế các thành phần phức tạp hoặc có phụ thuộc nặng (như Database, API bên thứ ba) bằng đối tượng giả có sẵn hành vi dễ điều khiển để cô lập mã cần chạy kiểm thử",
      "Chuyển đổi kiểm thử hộp đen sang tự động hóa hoàn toàn",
      "Sắp xếp thứ tự các ca kiểm thử",
    ],
    correctAnswerIndex: 1,
    explanation: "Mocking giúp cắt đứt tương tác vật lý nặng nề bên ngoài trong khi chạy test, bảo đảm ca unit test thực thi cực nhanh và hoàn toàn độc lập với trạng thái mạng hay cơ sở dữ liệu thật."
  },
  {
    id: 123,
    category: Category.DEBUGGING_TESTING,
    questionText: "Mục đích lớn nhất khi đo lường mức độ phủ mã nguồn (Code Coverage) của ca kiểm thử là gì?",
    options: [
      "Chứng minh chương trình chạy với hiệu năng hoàn hảo",
      "Đo đạc và xác định những phần mã nào trong dự án chưa từng được chạm tới bởi các ca test hiện tại, từ đó bổ sung ca kiểm thử cần thiết để loại bỏ điểm mù",
      "Đánh giá năng lực của lập trình viên thông qua số dòng code viết ra",
      "Xác định dung lượng RAM tối đa của ứng dụng",
    ],
    correctAnswerIndex: 1,
    explanation: "Độ bao phủ hỗ trợ đắc lực chỉ ra các góc khuất, luồng xử lý chưa bao giờ được chạy thử nghiệm thực tế, giúp kĩ sư bổ sung nguồn lực gia cố các ca kiểm thử bao quát chất lượng hệ thống."
  },
  {
    id: 124,
    category: Category.DEBUGGING_TESTING,
    questionText: "Công cụ Phân tích tĩnh (Static analysis tools) như `pylint` hay `flake8` hoạt động dựa trên cơ chế nào?",
    options: [
      "Chạy chương trình liên tục với dữ liệu tải lớn để phát hiện tràn bộ nhớ",
      "Quét và kiểm tra kiểm duyệt trực tiếp mã nguồn văn bản máy tính để đối chiếu với các lỗi phong cách, chuẩn viết code PEP8 và lỗi logic tiềm ẩn mà không cần thực thi chương trình",
      "Kiểm tra tính chịu lỗi vật lý của server khi mất điện đột ngột",
      "Thu thập phản hồi từ người sử dụng",
    ],
    correctAnswerIndex: 1,
    explanation: "Phân tích tĩnh đọc cấu trúc code như một văn bản phân tích cây cú pháp để sớm vạch trần các lỗi đặt tên, biến khai báo thừa, lỗi rò rỉ cơ bản mà không làm hao tổn bộ nhớ vận hành hệ thống."
  },
  {
    id: 125,
    category: Category.RECURSION_OOP,
    questionText: "Cho hàm số đệ quy sau thực thi trên một danh sách lồng nhau (nested list), chương trình sẽ thực hiện hiển thị kết quả nào lên màn hình?",
    codeSnippet: "def count_ints(s):\n    if type(s) == int:\n        return 1\n    if type(s) == list:\n        total = 0\n        for item in s:\n            total += count_ints(item)\n        return total\n    return 0\n\nprint(count_ints([1, [2, 3], 4]))",
    options: [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 6",
    ],
    correctAnswerIndex: 1,
    explanation: "Giải nghĩa các bước đệ quy đếm số nguyên:\n- count_ints nhận s = [1, [2, 3], 4] là list. total = 0.\n- Duyệt phần tử 1 (int): total += count_ints(1) (bằng 1).\n- Duyệt phần tử [2, 3] (list): count_ints([2, 3]) duyệt 2 (int -> 1) và 3 (int -> 1), tổng là 2. Duyệt về kết quả: total += 2.\n- Duyệt phần tử 4 (int): total += count_ints(4) (bằng 1).\nTổng total cuối cùng: 1 + 2 + 1 = 4."
  },
  {
    id: 4001,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Tư duy Tính toán (Computational Thinking - CT) là gì?",
    options: [
      "A. Một phương pháp giải quyết vấn đề sử dụng các khái niệm từ khoa học máy tính để thiết kế giải pháp.",
      "B. Một cách suy nghĩ chỉ áp dụng cho các nhà khoa học máy tính.",
      "C. Quá trình viết mã bằng Python.",
      "D. Khả năng sử dụng máy tính."
    ],
    correctAnswerIndex: 0,
    explanation: "Tư duy tính toán (Computational Thinking) là phương pháp luận giải quyết vấn đề bằng cách áp dụng các mô hình và khái niệm của Khoa học máy tính như phân rã, trừu tượng, thuật toán."
  },
  {
    id: 4002,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Đâu là bốn thành phần chính của Tư duy Tính toán?",
    options: [
      "A. Phân rã, Nhận dạng mẫu, Trừu tượng hóa và Thiết kế thuật toán.",
      "B. Lập trình, Gỡ lỗi, Biên dịch và Thực thi.",
      "C. Đầu vào, Đầu ra, Xử lý và Lưu trữ.",
      "D. Phần cứng, Phần mềm, Dữ liệu và Mạng máy tính."
    ],
    correctAnswerIndex: 0,
    explanation: "Bốn chân đế quan trọng kiến tạo nên CT là Decomposition (Phân rã), Pattern Recognition (Nhận diện mẫu), Abstraction (Trừu tượng hóa), và Algorithm Design (Thiết kế thuật toán)."
  },
  {
    id: 4003,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Trong các kỹ thuật chính của Tư duy Tính toán, “Phân rã” (Decomposition) là gì?",
    options: [
      "A. Chia một vấn đề lớn thành các phần nhỏ hơn, dễ quản lý hơn.",
      "B. Tìm kiếm những điểm tương đồng hoặc các yếu tố lặp lại trong một vấn đề.",
      "C. Tập trung vào các chi tiết quan trọng và bỏ qua những chi tiết không liên quan.",
      "D. Tạo ra các hướng dẫn từng bước để giải quyết một vấn đề."
    ],
    correctAnswerIndex: 0,
    explanation: "Phân rã (Decomposition) giúp đơn giản hóa một bài toán đồ sộ ban đầu bằng cách tách rời nó thành nhiều phần mục nhỏ để giải quyết độc lập."
  },
  {
    id: 4004,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kỹ thuật lập trình “Lập trình” (Programming) là gì?",
    options: [
      "A. Cho một bộ chỉ dẫn và một nhiệm vụ, viết một chuỗi các chỉ dẫn để thực hiện nhiệm vụ đó.",
      "B. Quá trình thiết kế một phần cứng máy tính.",
      "C. Quá trình sử dụng mạng máy tính.",
      "D. Viết các chỉ dẫn mã trên giấy."
    ],
    correctAnswerIndex: 0,
    explanation: "Lập trình là đưa cho máy tính cấu trúc chỉ dẫn tuần tự, rõ ràng tương thích với cú pháp của ngôn ngữ để hoàn thành công việc cụ thể."
  },
  {
    id: 4005,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Đâu không phải là một kiểu dữ liệu (giá trị đối tượng)?",
    options: [
      "A. Hàm (ví dụ: move_forward()).",
      "B. Số (ví dụ: 1, -2.5).",
      "C. Chuỗi ký tự (ví dụ: \"Hello\").",
      "D. Danh sách (ví dụ: [1, 2, 3])."
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm move_forward() là một luồng thực thi nhiệm vụ (chương trình con), không phải là dạng cấu trúc kiểu đối tượng dữ liệu lưu trữ giá trị như int, float, str hay list."
  },
  {
    id: 4006,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Vai trò chính của AI trong lập trình, như được nhấn mạnh trong bài giảng, là gì?",
    options: [
      "A. Một công cụ trợ lý giúp quá trình giải quyết vấn đề hiệu quả hơn.",
      "B. Một công cụ đảm bảo mã nguồn chính xác và an toàn 100%.",
      "C. Để thay thế tư duy phản biện của một lập trình viên.",
      "D. Viết các chương trình phức tạp hoàn chỉnh chỉ từ một câu lệnh duy nhất."
    ],
    correctAnswerIndex: 0,
    explanation: "AI đóng vai trò như một người trợ lý đắc lực, hỗ trợ tăng tốc viết code và gợi ý giải thuật, hoàn toàn không thể thế chỗ tư duy logic hoặc đảm bảo 100% đúng đắn."
  },
  {
    id: 4007,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Vấn đề “ảo giác” của AI (AI “hallucination”) là gì?",
    options: [
      "A. AI tự tin tạo ra thông tin không chính xác hoặc không có thực (ví dụ: tự chế ra một thư viện hoặc một hàm không tồn tại).",
      "B. AI tạo ra mã nguồn có lỗ hổng bảo mật.",
      "C. AI tạo ra mã nguồn không hiệu quả về mặt tính toán.",
      "D. AI thể hiện sự thiên vị trong các thuật toán."
    ],
    correctAnswerIndex: 0,
    explanation: "Ảo giác của AI (AI Hallucination) là việc mô hình ngôn ngữ lớn đưa ra thông tin bịa đặt, phi lý nhưng ngôn từ cực kỳ tự tin, mạch lạc khiến người dùng dễ bị lừa."
  },
  {
    id: 4008,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Bài học chính từ ví dụ thực tế trong đó một đoạn mã do AI tạo ra đã vô tình xóa các tệp hệ thống quan trọng là gì?",
    options: [
      "A. Không bao giờ chạy mã do AI tạo ra, đặc biệt là các lệnh nguy hiểm, mà không hiểu 100% nó làm gì.",
      "B. ChatGPT an toàn hơn GitHub Copilot để tạo các mã lệnh hệ thống.",
      "C. Không bao giờ nên sử dụng AI để viết mã tương tác với hệ thống tệp.",
      "D. Chỉ những lập trình viên cao cấp mới nên sử dụng AI để tạo mã lệnh."
    ],
    correctAnswerIndex: 0,
    explanation: "Lập trình viên luôn gánh vác trách nhiệm cuối cùng với các dòng lệnh chạy trên máy tính. Bạn bắt buộc phải tự thẩm định trước khi chạy bất kì đoạn mã generator nào từ AI."
  },
  {
    id: 4009,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều nào sau đây KHÔNG được đề cập đến như một khả năng mà AI có thể hỗ trợ trong các tác vụ lập trình?",
    options: [
      "A. Đảm bảo sinh viên sẽ làm tốt toàn bộ các bài thi Học phần Tư duy Tính toán.",
      "B. Giúp tìm và sửa lỗi (Debugging).",
      "C. Tạo tài liệu cho các hàm (Documentation).",
      "D. Giải thích các đoạn mã phức tạp (Code Explanation)."
    ],
    correctAnswerIndex: 0,
    explanation: "AI không thể bao thầu hay bảo trợ đảm bảo điểm số hay kết quả kiểm tra. Thực học, kỹ năng tư duy và lập luận logic của chính sinh viên là then chốt."
  },
  {
    id: 4010,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "“Danh sách kiểm tra sự phụ thuộc quá mức vào AI” cho thấy một sinh viên có thể đang quá phụ thuộc vào AI nếu họ...?",
    options: [
      "A. Lập tức tìm đến AI khi gặp bất kỳ lỗi nào mà không tự thử gỡ lỗi trước.",
      "B. Sử dụng AI để giải thích một khái niệm họ không hiểu.",
      "C. Sử dụng AI để gợi ý cách viết tối ưu cho một hàm.",
      "D. Sử dụng AI để kiểm tra mã của họ xem có lỗi tiềm ẩn nào không sau khi đã viết xong."
    ],
    correctAnswerIndex: 0,
    explanation: "Sự ỷ lại AI thể hiện rõ rệt nhất khi sinh viên mất đi phản xạ tự mình động não suy nghĩ, ném ngay bug thu được cho AI vá xằng bậy mà không tự debug phân tích."
  },
  {
    id: 4011,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho biểu thức sau:\nx = 13 // 2 + 5 % 2 * 1.5 - 1\n\nGiá trị của x là bao nhiêu?",
    options: [
      "A. 6.5",
      "B. 7.5",
      "C. 7.0",
      "D. 6.0"
    ],
    correctAnswerIndex: 0,
    explanation: "Thứ tự: 13 // 2 = 6; 5 % 2 = 1; 1 * 1.5 = 1.5; 6 + 1.5 - 1 = 6.5."
  },
  {
    id: 4012,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho đoạn mã lập trình sau:\n\na, b, c = 2, 5, 8\nprint(a < b < c == 8)\n\nKết quả in ra màn hình là gì?",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Báo lỗi"
    ],
    correctAnswerIndex: 0,
    explanation: "Cơ chế comparison chaining của Python: a < b < c == 8 tương đương (a < b) and (b < c) and (c == 8). Cả ba vế đều đúng (2 < 5 và 5 < 8 và 8 == 8) nên cho kết quả True."
  },
  {
    id: 4013,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho biểu thức sau:\nx = (2 ** 3) + (10 % 3) * (15 // 4)\n\nGiá trị của x thu được là bao nhiêu?",
    options: [
      "A. 11",
      "B. 8",
      "C. 16",
      "D. 6"
    ],
    correctAnswerIndex: 0,
    explanation: "(2 ** 3) = 8; (10 % 3) = 1; (15 // 4) = 3; do đó x = 8 + 1 * 3 = 11."
  },
  {
    id: 4014,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho đoạn mã sau:\n\nn = \"7\"\nn = int(n)\nprint(n * 2)\n\nKết quả in ra màn hình là gì?",
    options: [
      "A. 14",
      "B. 9",
      "C. Báo lỗi",
      "D. 77"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm int() đổi chuỗi \"7\" sang số nguyên 7. Phép nhân 7 * 2 trả về 14 kiểu số nguyên."
  },
  {
    id: 4015,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Chọn phát biểu đúng về f-string trong Python?",
    options: [
      "A. f-string cho phép chèn biểu thức Python trực tiếp trong dấu ngoặc nhọn {}.",
      "B. f-string chỉ dùng được trong một số phiên bản rất cũ.",
      "C. f-string là chuỗi thông thường, không thể chèn biểu thức.",
      "D. f-string bắt buộc phải kết hợp với format()."
    ],
    correctAnswerIndex: 0,
    explanation: "Định dạng f-string (từ Python 3.6+) cho phép nhúng trực tiếp biến số hoặc biểu thức logic trực quan nội suy trong dấu ngoặc nhọn `{}`."
  },
  {
    id: 4016,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Mục đích chính của việc sử dụng các câu lệnh điều kiện (như if-else) trong lập trình là gì?",
    options: [
      "A. Để cho phép chương trình đưa ra quyết định và thực hiện các hành động khác nhau dựa trên các điều kiện.",
      "B. Để lặp lại một khối mã nhiều lần.",
      "C. Để giúp chương trình trông có tổ chức hơn.",
      "D. Để làm cho chương trình chạy nhanh hơn."
    ],
    correctAnswerIndex: 0,
    explanation: "Lệnh rẽ nhánh có mục đích kiểm soát luồng điều hành, giúp chương trình đưa ra hành vi khác nhau dựa trên đánh giá True/False của biểu thức logic."
  },
  {
    id: 4017,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Sự khác biệt chính giữa “Cấu trúc chương trình” (Program Structure) và “Luồng chương trình” (Program Flow) là gì?",
    options: [
      "A. Cấu trúc là thứ tự các dòng mã được viết trong tệp, trong khi luồng là thứ tự chúng được thực thi.",
      "B. Luồng chương trình luôn giống hệt cấu trúc chương trình.",
      "C. Cấu trúc chương trình xác định tốc độ, còn luồng chương trình xác định bộ nhớ sử dụng.",
      "D. Chúng là hai thuật ngữ khác nhau cho cùng một khái niệm."
    ],
    correctAnswerIndex: 0,
    explanation: "Cấu trúc chương trình là trật tự viết tĩnh của dòng mã trên ổ cứng. Luồng chương trình biểu diễn luồng chạy động khi chương trình hoạt động trực tiếp (có rẽ nhánh, lặp, nhảy)."
  },
  {
    id: 4018,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều gì sẽ xảy ra khi một biểu thức điều kiện trong câu lệnh if-elif-else được đánh giá là True?",
    options: [
      "A. Khối mã tương ứng với điều kiện True đó sẽ được thực thi và phần còn lại của chuỗi sẽ bị bỏ qua.",
      "B. Chỉ khối else sẽ được thực thi.",
      "C. Chương trình sẽ báo lỗi.",
      "D. Tất cả các khối mã trong toàn bộ chuỗi if-elif-else sẽ được thực thi."
    ],
    correctAnswerIndex: 0,
    explanation: "Khi bắt gặp điều kiện True đầu tiên từ trên xuống, chương trình chạy khối mã của nó rồi thoát cấu trúc, ngó lơ tất cả các nhánh điều kiện còn lại ở phía dưới."
  },
  {
    id: 4019,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kỹ thuật gỡ lỗi (debugging) sử dụng các câu lệnh in để theo dõi giá trị của một biến tại các điểm khác nhau trong chương trình được gọi là gì?",
    options: [
      "A. Trace prints (In vết).",
      "B. Watch prints (In theo dõi).",
      "C. Syntax Highlighting (Tô sáng cú pháp).",
      "D. Glass Box Testing (Kiểm thử hộp kính)."
    ],
    correctAnswerIndex: 0,
    explanation: "Ghi chèn dòng lệnh in print() ở các ranh mốc quan trọng để giám định sự biến thiên giá trị biến gọi là Trace prints (In vết)."
  },
  {
    id: 4020,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Lợi ích chính của việc định nghĩa và sử dụng các hàm (functions) trong một chương trình là gì?",
    options: [
      "A. Cho phép tái sử dụng mã, tránh lặp lại và làm cho chương trình có cấu trúc rõ ràng hơn.",
      "B. Tất cả các chương trình Python đều bắt buộc phải có ít nhất một hàm do người dùng định nghĩa.",
      "C. Để ẩn mã khỏi những người dùng khác.",
      "D. Làm cho tệp mã nguồn có dung lượng lớn hơn."
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm giúp đóng gói, tái sử dụng các chùm lệnh có chức năng chung, từ đó tối ưu quy mô và độ sạch sẽ dễ bảo trì của ứng dụng (Don't Repeat Yourself)."
  },
  {
    id: 4021,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kết quả đoạn code sau thu được là gì?\n\ns = 0\nfor x in range(1, 5):\n    s += x\nprint(s)",
    options: [
      "A. 10",
      "B. 14",
      "C. 15",
      "D. 5"
    ],
    correctAnswerIndex: 0,
    explanation: "range(1,5) lặp x qua 1, 2, 3, 4. Tổng s = 1 + 2 + 3 + 4 = 10."
  },
  {
    id: 4022,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Khi nào nên lặp theo chỉ số thay vì lặp qua phần tử trong Python?",
    options: [
      "A. Khi cần sửa phần tử tại chỗ hoặc cần biết vị trí index của phần tử.",
      "B. Khi danh sách rất ngắn.",
      "C. Khi muốn duyệt nhanh hơn.",
      "D. Khi chỉ cần đọc giá trị của các phần tử."
    ],
    correctAnswerIndex: 0,
    explanation: "Lặp qua chỉ mục (index) giúp lập trình viên bóc tách chính xác ô nhớ và thay thế trực tiếp (in-place) dữ liệu cũ nằm trong danh sách."
  },
  {
    id: 4023,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kết quả in ra của đoạn code sau là gì?\n\na = [1, 2, 3]\nfor x in a:\n    x = x + 2\nprint(a)",
    options: [
      "A. [1, 2, 3]",
      "B. [3, 4, 5]",
      "C. [1, 2, 3, 1, 2, 3]",
      "D. Báo lỗi"
    ],
    correctAnswerIndex: 0,
    explanation: "Biến x nắm giữ bản sao của phần tử mảng ở từng mốc. Phép tính x = x + 2 không ảnh hưởng đến ô nhớ của phần tử nằm trong mảng a. a vẫn giữ nguyên [1, 2, 3]."
  },
  {
    id: 4024,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Giá trị cuối cùng của biến count sau khi đoạn mã thực hiện xong là bao nhiêu?\n\ncount = 0\nfor i in range(5):\n    count += 1",
    options: [
      "A. 5",
      "B. 6",
      "C. 4",
      "D. Phụ thuộc vào hệ thống"
    ],
    correctAnswerIndex: 0,
    explanation: "Vòng lặp chạy 5 lần (i lướt từ 0 đến 4). Giá trị count nâng dần từ 0 lên 5."
  },
  {
    id: 4025,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kết quả in ra màn hình là gì?\n\ntable = [[2, 1, 0], [3, 5, 2], [4, 0, 1]]\nprint(sum(row[0] for row in table))",
    options: [
      "A. 9",
      "B. 12",
      "C. 6",
      "D. 3"
    ],
    correctAnswerIndex: 0,
    explanation: "Biểu thức sinh row[0] for row in table lấy ra lần lượt 2, 3, 4. Tổng của chúng thu được 2 + 3 + 4 = 9."
  },
  {
    id: 4026,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào sau đây về hàm trong Python là ĐÚNG?",
    options: [
      "A. Hàm có thể trả về nhiều giá trị dưới dạng một tuple.",
      "B. Hàm luôn trả về một giá trị duy nhất và không thể trả về nhiều giá trị.",
      "C. Hàm không thể trả về giá trị (luôn chỉ in ra màn hình).",
      "D. Hàm chỉ có thể trả về duy nhất kiểu dữ liệu số nguyên."
    ],
    correctAnswerIndex: 0,
    explanation: "Python cho phép đặt dấu phẩy chia cắt các thành phần trả về trong return. Bộ định dạng tự gói chúng thành một Tuple duy nhất."
  },
  {
    id: 4027,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều gì xảy ra khi chạy đoạn mã sau:\n\ndef add(a, b):\n    return a + b\n\nassert add(3, 2) == 5",
    options: [
      "A. Không hiển thị gì (chạy thành công mà không có lỗi).",
      "B. In ra giá trị 1.",
      "C. In ra giá trị 5.",
      "D. Gây ra ngoại lệ AssertionError."
    ],
    correctAnswerIndex: 0,
    explanation: "add(3, 2) cho kết quả 5. Biểu thức assert 5 == 5 là True nên chương trình lướt qua trơn tru không nổ lỗi."
  },
  {
    id: 4028,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Hàm nào không phải là hàm dựng sẵn (built-in) của Python?",
    options: [
      "A. sqrt() (nằm trong thư viện math).",
      "B. max()",
      "C. round()",
      "D. type()"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm sqrt() khu trú bên trong thư viện và module math, muốn dùng bắt buộc phải khai báo import math ở đầu chương trình."
  },
  {
    id: 4029,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào về assert là ĐÚNG?",
    options: [
      "A. Nó dừng thực thi chương trình và báo lỗi khi điều kiện kiểm tra bị SAI.",
      "B. Nó chỉ hoạt động với giá trị số nguyên.",
      "C. Nó thông báo ra màn hình khi điều kiện ĐÚNG.",
      "D. Nó không ảnh hưởng tới việc thực thi của chương trình."
    ],
    correctAnswerIndex: 0,
    explanation: "Assert dùng kiểm tra điều kiện logic cốt lõi. Nếu kết quả điều kiện rơi vào False, nó bắn ra ngoại lệ AssertionError ngắt hệ thống gỡ lỗi kịp thời."
  },
  {
    id: 4030,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Nếu một hàm Python không kết thúc bằng câu lệnh return rõ ràng, giá trị mặc định được trả về là None. Phát biểu này là Đúng hay Sai?",
    options: [
      "A. Đúng",
      "B. Sai"
    ],
    correctAnswerIndex: 0,
    explanation: "Nếu lướt qua hết thảy khối thụt lề mà không đụng trúng từ khóa return, Python tự động trả về giá trị None."
  },
  {
    id: 4031,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào đúng về list trong Python?",
    options: [
      "A. list là cấu trúc dữ liệu có thứ tự và có thể thay đổi (mutable).",
      "B. list là cấu trúc dữ liệu có thứ tự và không thể thay đổi.",
      "C. list là một tập hợp không có thứ tự các phần tử duy nhất.",
      "D. list chỉ chứa các phần tử có cùng một kiểu dữ liệu."
    ],
    correctAnswerIndex: 0,
    explanation: "Danh sách (list) duy trì nguyên vẹn thứ tự thêm vào của các phần tử và cho phép trực tiếp chỉnh sửa nội dung bên trong nó (mutable)."
  },
  {
    id: 4032,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Lệnh nào dùng để thêm 1 phần tử vào cuối list?",
    options: [
      "A. append()",
      "B. push()",
      "C. add()",
      "D. insert()"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức append(element) của đối tượng list ghép nối duy nhất một phần tử mới vào vị trí đuôi cùng danh sách."
  },
  {
    id: 4033,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Đâu là đặc điểm quan trọng nhất của tuple?",
    options: [
      "A. Không thể thay đổi giá trị của các phần tử sau khi tạo (immutable).",
      "B. Có thể thay đổi giá trị phần tử bất kỳ lúc nào.",
      "C. Không có thứ tự.",
      "D. Chỉ chứa được dữ liệu dạng số."
    ],
    correctAnswerIndex: 0,
    explanation: "Đặc tính sống còn phân biệt Tuple với List là Tuple hoàn toàn bất biến (immutable), một khi được tạo ra thì không thể xóa, sửa hay bổ sung."
  },
  {
    id: 4034,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Trong một từ điển (dictionary), mỗi key bắt buộc phải:",
    options: [
      "A. Là duy nhất và thuộc kiểu dữ liệu không thể thay đổi (hashable).",
      "B. Có thể thay đổi được giá trị tùy ý.",
      "C. Có thể trùng nhau trong cùng một từ điển.",
      "D. Phải luôn là một số nguyên."
    ],
    correctAnswerIndex: 0,
    explanation: "Vì dictionary hoạt động dựa trên cơ chế bảng băm, mọi Key bắt buộc phải mang giá trị độc bản (unique) và băm được (thuộc kiểu bất biến)."
  },
  {
    id: 4035,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Đâu là cú pháp đúng để khai báo một dictionary gồm tên là ”An” và năm là 3?",
    options: [
      "A. {\"name\": \"An\", \"year\": 3}",
      "B. [\"name\": \"An\", \"year\": 3]",
      "C. {\"name\", \"An\", \"year\", 3}",
      "D. (\"name\": \"An\", \"year\": 3)"
    ],
    correctAnswerIndex: 0,
    explanation: "Cú pháp dictionary đúng chuẩn biểu kiến sử dụng ngoặc nhọn kết hợp ngăn cách liên kết dạng {khóa: giá trị}."
  },
  {
    id: 4036,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều kiện quan trọng nhất để có thể áp dụng thuật toán tìm kiếm nhị phân (binary search) trên một mảng là gì?",
    options: [
      "A. mảng phải được sắp xếp trước tăng hoặc giảm dần.",
      "B. Mảng phải có số lượng phần tử là lũy thừa của 2.",
      "C. Mảng chỉ được chứa các phần tử thuộc kiểu số nguyên.",
      "D. Mảng không được chứa bất kỳ phần tử nào trùng lặp."
    ],
    correctAnswerIndex: 0,
    explanation: "Binary search thực thi nhảy vùng chia hai không gian tìm kiếm dựa trên so sánh độ lớn, do đó mảng đích bắt buộc phải trải qua sắp đặt thứ tự sẵn."
  },
  {
    id: 4037,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho một mảng đã được sắp xếp tăng dần, chọn phát biểu đúng:",
    options: [
      "A. Binary search thường nhanh hơn nhiều so với linear search khi kích thước mảng đủ lớn.",
      "B. Linear search luôn tốt hơn binary search.",
      "C. Không thể áp dụng binary search nếu mảng có phần tử trùng nhau.",
      "D. Cả hai thuật toán luôn có thời gian chạy tương đương nhau."
    ],
    correctAnswerIndex: 0,
    explanation: "Độ phức tạp Binary search chỉ tốn O(log n) bước tính toán, tối ưu vượt bậc với mảng quy mô so với tìm kiếm tuyến tính cực nhọc tốn O(n)."
  },
  {
    id: 4038,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Thuật toán sắp xếp nào sau đây có độ phức tạp thời gian trung bình tốt nhất là O(n log n)?",
    options: [
      "A. Merge Sort",
      "B. Selection Sort",
      "C. Bubble Sort",
      "D. Insertion Sort"
    ],
    correctAnswerIndex: 0,
    explanation: "Sắp xếp trộn (Merge Sort) sử dụng kỹ thuật chia để trị chuẩn có độ phức tạp đo đạc trung bình tốt nhất đạt O(n log n). Các thuật toán kia chỉ đạt O(n^2)."
  },
  {
    id: 4039,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào sau đây là đúng về thuật toán sắp xếp nhanh (Quick Sort)?",
    options: [
      "A. Trường hợp xấu nhất có độ phức tạp thời gian lên tới O(n^2) nếu chọn phần tử chốt (pivot) không tốt.",
      "B. Luôn luôn có độ phức tạp thời gian cực hạn là O(n log n) trong mọi trường hợp.",
      "C. Hoàn toàn không sử dụng kỹ thuật đệ quy.",
      "D. Luôn chạy chậm hơn thuật toán Bubble Sort."
    ],
    correctAnswerIndex: 0,
    explanation: "Nếu việc bốc nhầm điểm pivot trúng liên tiếp các giá trị cận biên lớn hoặc bé nhất của dãy con, Quick sort sụt về độ phức tạp O(n^2)."
  },
  {
    id: 4040,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Về mặt ý tưởng cơ bản, Selection Sort khác biệt lớn nhất với Bubble Sort ở điểm nào?",
    options: [
      "A. Selection Sort ở mỗi bước lặp sẽ chọn phần tử nhỏ nhất từ phần chưa sắp xếp để đưa lên đầu danh sách.",
      "B. Selection Sort có sử dụng pivot, trong khi Bubble Sort thì không.",
      "C. Selection Sort luôn luôn có độ phức tạp tốt hơn Bubble Sort.",
      "D. Selection Sort chỉ sắp xếp được các dãy số nguyên, trong khi Bubble Sort sắp xếp được mọi kiểu dữ liệu."
    ],
    correctAnswerIndex: 0,
    explanation: "Lập ý Selection Sort nằm ở việc dò tìm ra giá trị nhỏ nhất của mảng con chưa xử lý rồi hoán đổi duy nhất một lần về mốc đầu phân vùng."
  },
  {
    id: 4041,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phương thức đặc biệt nào sau đây luôn được gọi một cách tự động khi một đối tượng mới của lớp được tạo ra trong Python?",
    options: [
      "A. __init__",
      "B. __eq__",
      "C. __str__",
      "D. __repr__"
    ],
    correctAnswerIndex: 0,
    explanation: "Phương thức dunder __init__ đóng vai trò constructor, chịu trách nhiệm tiếp quản cấu trúc biến và định hình giá trị thuộc tính lúc setup class."
  },
  {
    id: 4042,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Trong một phương thức định nghĩa bên trong một lớp (class), tham số self dùng để làm gì?",
    options: [
      "A. Tham chiếu tới chính thực thể/đối tượng hiện tại đang gọi phương thức đó.",
      "B. Lưu địa chỉ vùng nhớ của lớp (class metadata).",
      "C. Truyền giá trị mặc định cho toàn bộ phương thức.",
      "D. Tham chiếu tới lớp cha trực tiếp (superclass)."
    ],
    correctAnswerIndex: 0,
    explanation: "Tham số self định vị dòng địa chỉ của cá thể đối tượng đang đứng ra thực hiện phương thức, liên kết thực thể để chỉnh sửa giá trị biến."
  },
  {
    id: 4043,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Lệnh gọi phương thức dạng obj.method(a, b) tương đương hoàn toàn với cách gọi nào sau đây?",
    options: [
      "A. Class.method(obj, a, b)",
      "B. Class.method(a, b)",
      "C. obj.method(self, a, b)",
      "D. method(obj, a, b)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lệnh obj.method(a, b) thực chất là cú pháp rút gọn, đằng sau hậu trường Python dịch về nguyên bản Class.method(obj, a, b)."
  },
  {
    id: 4044,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Trong cơ chế kế thừa (inheritance), Python thực hiện tìm kiếm một phương thức bị ghi đè theo thứ tự nào?",
    options: [
      "A. Từ lớp con ngược lên lớp cha (subclass to superclass - bottom-up).",
      "B. Từ lớp cha xuôi xuống lớp con.",
      "C. Tìm kiếm ngẫu nhiên giữa các lớp trong hệ thống.",
      "D. Chỉ tìm kiếm duy nhất trong phạm vi lớp hiện tại."
    ],
    correctAnswerIndex: 0,
    explanation: "MRO (Method Resolution Order) thực hiện tìm kiếm hướng bottom-up: rà quét kiếm tìm trong lớp con trước, nếu vô vọng mới tra tầm lên lớp cha."
  },
  {
    id: 4045,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Sự khác biệt đúng nhất giữa toán tử is và toán tử so sánh bằng == trong Python là gì?",
    options: [
      "A. is dùng để kiểm tra hai biến có cùng trỏ tới một đối tượng trong bộ nhớ hay không, trong khi == kiểm tra tính tương đương về mặt giá trị.",
      "B. is dùng để so sánh kiểu dữ liệu, còn == so sánh giá trị cụ thể.",
      "C. is so sánh giá trị, còn == so sánh địa chỉ vùng nhớ.",
      "D. is chỉ dùng được cho kiểu số, còn == chỉ dùng được cho kiểu chuỗi."
    ],
    correctAnswerIndex: 0,
    explanation: "Toán tử == dùng so khớp lượng trị (equality), còn is dùng đối chiếu so gốc ô nhận dạng ID địa chỉ lưu trữ trong hệ thống RAM (identity)."
  },
  {
    id: 4046,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào sau đây là ĐÚNG khi so sánh kỹ thuật đệ quy (recursion) với cấu trúc vòng lặp (iteration)?",
    options: [
      "A. Đệ quy cực kỳ phù hợp để giải quyết các bài toán có cấu trúc phân rã lặp lại tự nhiên (như cấu trúc cây, thư mục, fractal).",
      "B. Đệ quy luôn luôn tiết kiệm bộ nhớ hơn so với sử dụng vòng lặp.",
      "C. Vòng lặp luôn dễ đọc và dễ bảo trì hơn đệ quy trong mọi trường hợp.",
      "D. Kỹ thuật đệ quy không cần sử dụng vùng nhớ ngăn xếp (call stack)."
    ],
    correctAnswerIndex: 0,
    explanation: "Đệ quy đem lại cấu trúc tư duy siêu việt khi giải các bài toán bóc tách có dạng hình học hoặc dữ liệu phân nhánh tự nhiên (như cấu trúc cây n-phân)."
  },
  {
    id: 4047,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho hàm tính số Fibonacci đệ quy như sau:\n\ndef fib(n):\n    if n == 0 or n == 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nGiá trị trả về của fib(6) là bao nhiêu?",
    options: [
      "A. 8",
      "B. 13",
      "C. 21",
      "D. 6"
    ],
    correctAnswerIndex: 0,
    explanation: "Chuỗi Fib từ mốc 0: 0, 1, 1, 2, 3, 5, 8. fib(6) = 8."
  },
  {
    id: 4048,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào đúng nhất về hàm đệ quy tính Fibonacci ở câu hỏi trên?",
    options: [
      "A. Hàm có rất nhiều lời gọi đệ quy lặp lại không cần thiết (gây lãng phí hiệu năng nghiêm trọng khi n lớn).",
      "B. Hàm chạy cực kỳ tối ưu và luôn nhanh hơn phiên bản vòng lặp.",
      "C. Hàm không cần định nghĩa trường hợp cơ sở (base case).",
      "D. Hàm chỉ có thể chạy thành công đối với các giá trị n ≤ 5."
    ],
    correctAnswerIndex: 0,
    explanation: "Độ phức tạp Fibonacci đệ quy thuần túy lên tới O(2^n) do các nút nhánh con lặp sâu, bóc lột năng lực CPU tính toán trùng nhau."
  },
  {
    id: 4049,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho đoạn code định nghĩa hàm sau:\n\ndef p(a, b):\n    if b == 0:\n        return 1\n    return a * p(a, b - 1)\n\nGiá trị của lời gọi hàm p(2, 5) sau khi thực thi là bao nhiêu?",
    options: [
      "A. 32",
      "B. 16",
      "C. 64",
      "D. 10"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm đệ quy p(a, b) tính giá trị toán học lũy thừa a^b. Tính: 2^5 = 32."
  },
  {
    id: 4050,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Kết quả hiển thị trên màn hình khi thực hiện lệnh gọi countdown(3) là gì?\n\ndef countdown(n):\n    if n <= 0:\n        print(\"GO\")\n    else:\n        print(n)\n        countdown(n - 1)",
    options: [
      "A. 3 \\n 2 \\n 1 \\n GO",
      "B. 3 2 GO",
      "C. GO 1 2 3",
      "D. 1 2 3 GO"
    ],
    correctAnswerIndex: 0,
    explanation: "Vì lệnh print(n) được kích hoạt trước khi chui vào hàm con countdown(n-1), các số lớn in trước, dội ngược từ 3, 2, 1 rồi tới chữ GO."
  },
  {
    id: 4051,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều gì xảy ra khi một ngoại lệ (exception) xuất hiện trong khối lệnh try và chương trình có một khối except tương ứng?",
    options: [
      "A. Khối except tương ứng sẽ được thực thi, sau đó chương trình bỏ qua lỗi này và tiếp tục chạy bình thường các dòng mã phía sau cấu trúc try-except.",
      "B. Chương trình tự động khởi động lại toàn bộ tiến trình.",
      "C. Chương trình bị crash dừng chạy ngay lập tức.",
      "D. Toàn bộ mã bên trong khối try vẫn tiếp tục chạy tiếp tục từ dòng gây lỗi."
    ],
    correctAnswerIndex: 0,
    explanation: "Khối lọc except đóng vai trò dập ngắt và vá lỗi, giúp luồng chạy hệ thống tiếp tục vận hành lành mạnh sang các dòng lệnh tiếp nối bên dưới."
  },
  {
    id: 4052,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Điều gì xảy ra nếu một ngoại lệ phát sinh trong quá trình chạy nhưng không hề có khối except tương ứng hay khối mặc định nào bắt lấy nó?",
    options: [
      "A. Ngoại lệ được chuyển tiếp ngược lên khung gọi (frame) tiếp theo trong ngăn xếp thực thi (call stack) để tìm trình xử lý.",
      "B. Python tự động sửa lỗi và tiếp tục thực thi dòng tiếp theo.",
      "C. Khối xử lý dọn dẹp finally sẽ hoàn toàn bị bỏ qua.",
      "D. Ngoại lệ bị âm thầm bỏ qua và chương trình tiếp tục thực thi không dừng lại."
    ],
    correctAnswerIndex: 0,
    explanation: "Lỗi unhandled bốc hơi sủi bọt ngược lên Stack, sột tìm kiếm ở các hàm gọi mẹ cho tới khi thoát ra rìa đỉnh điểm gây hỏng sập app."
  },
  {
    id: 4053,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phát biểu nào mô tả đúng nhất về lỗi cú pháp (syntax error) trong Python?",
    options: [
      "A. Nó được trình thông dịch phát hiện và báo lỗi ngay trong quá trình dịch trước khi chương trình thực sự bắt đầu chạy.",
      "B. Nó xảy ra khi dữ liệu đầu vào không hợp lệ trong lúc chương trình đang chạy.",
      "C. Nó xảy ra khi người dùng cố gắng thực hiện phép chia một số cho 0.",
      "D. Nó hoàn toàn có thể được bắt và xử lý êm đẹp bằng các khối lệnh try-except."
    ],
    correctAnswerIndex: 0,
    explanation: "Viết sai cấu trúc văn phạm cú pháp sẽ khiến chương trình bị chặn phát hiện ngay tắp lự ở khâu biên dịch tĩnh ban đầu, không thể dịch nạp để chạy."
  },
  {
    id: 4054,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Khi nào khối mã finally trong cấu trúc try-except-finally được thực thi?",
    options: [
      "A. Luôn luôn được thực thi trong mọi trường hợp, bất kể có xảy ra ngoại lệ hay không.",
      "B. Chỉ khi nào có ngoại lệ thực sự xảy ra và được bắt thành công.",
      "C. Chỉ khi chương trình thực thi trơn tru mà không có ngoại lệ nào phát sinh.",
      "D. Chỉ khi có lệnh return được gọi từ bên trong khối try."
    ],
    correctAnswerIndex: 0,
    explanation: "Finally được thiết kế giữ vai trò dọn dẹp tối hậu, bất kể chặng try/except có xảy ra tranh chấp lỗi hay có return bẻ gãy sớm, finally vẫn được gọi chạy sòng phẳng."
  },
  {
    id: 4055,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Cho đoạn mã sau:\n\ndef divide(a, b):\n    assert b != 0, \"b cannot be zero\"\n    return a / b\n\nPhát biểu nào sau đây là ĐÚNG về câu lệnh assert được định nghĩa bên trên?",
    options: [
      "A. Nó sẽ phát sinh một ngoại lệ AssertionError kèm thông báo lỗi đã chỉ định nếu giá trị b == 0.",
      "B. Nó sẽ âm thầm bỏ qua lỗi và tiếp tục phép chia không dừng lại.",
      "C. Nó sẽ tự động phát sinh ngoại lệ ZeroDivisionError nếu b == 0.",
      "D. Nó đảm bảo phép chia luôn an toàn trong mọi lần chạy ở môi trường thực tế (production) khi trình thông dịch bật chế độ tối ưu hóa (-O)."
    ],
    correctAnswerIndex: 0,
    explanation: "Lệnh assert thi triển phép thẩm vấn b != 0. Điểm thẩm vấn này đổ bể (b==0), nó vạch trần vụ việc bằng cách bắn ra lỗi AssertionError cùng lời bình: 'b cannot be zero'."
  },
  {
    id: 4056,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Mục đích chính của việc sử dụng tệp tin (file) trong một chương trình máy tính là gì?",
    options: [
      "A. Lưu trữ dữ liệu lâu bền và an toàn ngay cả sau khi chương trình kết thúc hoặc tắt máy.",
      "B. Tránh việc khai báo và sử dụng quá nhiều biến trong bộ nhớ chương trình.",
      "C. Lưu trữ các dữ liệu mang tính tạm thời phục vụ tính toán nhanh.",
      "D. Giúp tăng tốc độ thực thi các câu lệnh của chương trình."
    ],
    correctAnswerIndex: 0,
    explanation: "File ghi thông tin thực tế lên mảng liên kết của ổ cứng, bảo lưu kết quả trường tồn qua các chu kỳ tắt bật máy tính."
  },
  {
    id: 4057,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Chế độ mở file (mode) nào cho phép ghi đè toàn bộ nội dung của tệp cũ (hoặc tự động tạo mới tệp nếu tệp chưa tồn tại)?",
    options: [
      "A. 'w'",
      "B. 'r'",
      "C. 'a'",
      "D. 'rw'"
    ],
    correctAnswerIndex: 0,
    explanation: "Cửa mở 'w' (Write) xóa sạch mọi dòng chữ cũ để mài bút viết lại từ đầu, nếu file chưa tồn tại nó tự lực sinh file mới."
  },
  {
    id: 4058,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Câu lệnh/Cấu trúc nào sau đây được khuyên dùng nhất vì giúp tự động đóng tệp tin an toàn ngay cả khi xảy ra lỗi đột ngột trong quá trình đọc ghi?",
    options: [
      "A. Cấu trúc with open(...) as f:",
      "B. Sử dụng hàm open() thông thường.",
      "C. Đóng thủ công bằng lệnh close().",
      "D. Sử dụng từ khóa finally."
    ],
    correctAnswerIndex: 0,
    explanation: "Cấu trúc 'with' triển khai cơ chế Context Manager đóng tệp tự động tinh gọn, an toàn hàng đầu kể cả khi phát sinh gián đoạn dở dang giữa đường."
  },
  {
    id: 4059,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Phương thức nào dùng để đọc toàn bộ nội dung của một tệp đang mở vào một chuỗi (string) duy nhất?",
    options: [
      "A. read()",
      "B. readlines()",
      "C. readline()",
      "D. load()"
    ],
    correctAnswerIndex: 0,
    explanation: "Hàm .read() đọc tuồn tuột không sót một chữ nào từ dòng đầu tới đáy tệp và gộp thành một chuỗi văn bản duy nhất để lưu vào biến."
  },
  {
    id: 4060,
    category: Category.PYTHON_QUESTIONS_P1,
    questionText: "Hàm nào dưới đây được sử dụng để kiểm tra xem một tệp tin hoặc một thư mục có thực sự tồn tại trên ổ cứng hay không?",
    options: [
      "A. os.path.exists()",
      "B. os.isfile()",
      "C. os.exist()",
      "D. os.check()"
    ],
    correctAnswerIndex: 0,
    explanation: "Sử dụng os.path.exists() quét nhanh hệ thống quản lý tập tin phần cứng để thẩm tra sự có mặt thực tế của file/thư mục."
  }
];

export function getDetailedPythonCategory(q: { questionText: string; codeSnippet?: string; explanation?: string; options?: string[] }): Category {
  const text = (q.questionText + " " + (q.codeSnippet || "") + " " + (q.explanation || "") + " " + (q.options?.join(" ") || "")).toLowerCase();
  
  // 1. Lý thuyết cơ bản về tư duy tính toán
  if (
    text.includes("tư duy tính toán") ||
    text.includes("computational thinking") ||
    text.includes("decomposition") ||
    text.includes("phân rã") ||
    text.includes("pattern recognition") ||
    text.includes("nhận diện mẫu") ||
    text.includes("nhận dạng mẫu") ||
    text.includes("abstraction") ||
    text.includes("trừu tượng hóa") ||
    text.includes("algorithm design") ||
    text.includes("thiết kế thuật toán") ||
    text.includes("biên dịch") ||
    text.includes("thông dịch") ||
    text.includes("máy tính")
  ) {
    return Category.PYTHON_THINKING;
  }

  // 2. AI hỗ trợ lập trình
  if (
    text.includes("ai hỗ trợ") ||
    text.includes("copilot") ||
    text.includes("chatgpt") ||
    text.includes("trợ lý") ||
    text.includes("sinh mã") ||
    text.includes("gemini") ||
    text.includes("llm") ||
    text.includes("prompt") ||
    text.includes("trí tuệ nhân tạo")
  ) {
    return Category.PYTHON_AI;
  }

  // 3. Thuật toán & Độ phức tạp
  if (
    text.includes("độ phức tạp") ||
    text.includes("complexity") ||
    text.includes("time complexity") ||
    text.includes("space complexity") ||
    text.includes("thuật toán") ||
    text.includes("algorithm") ||
    text.includes("sắp xếp") ||
    text.includes("sorting") ||
    text.includes("quick sort") ||
    text.includes("merge sort") ||
    text.includes("heap sort") ||
    text.includes("timsort") ||
    text.includes("stable sort") ||
    text.includes("bubble sort") ||
    text.includes("selection sort") ||
    text.includes("insertion sort") ||
    text.includes("dijkstra") ||
    text.includes("tìm kiếm nhị phân") ||
    text.includes("binary search") ||
    text.includes("hàng đợi") ||
    text.includes("queue") ||
    text.includes("deque") ||
    text.includes("stack") ||
    text.includes("overflow") ||
    text.includes("tháp hà nội") ||
    text.includes("tower of hanoi") ||
    text.includes("cây nhị phân") ||
    text.includes("tree") ||
    text.includes("bst") ||
    text.includes("o(1)") ||
    text.includes("o(n)") ||
    text.includes("o(log") ||
    text.includes("o(2^n)") ||
    text.includes("o(n^2)") ||
    text.includes("big-o") ||
    text.includes("big o")
  ) {
    return Category.ALGORITHMS;
  }

  // 4. Đệ quy & Hướng đối tượng (OOP)
  if (
    text.includes("class ") ||
    text.includes("đối tượng") ||
    text.includes("oop") ||
    text.includes("đệ quy") ||
    text.includes("recursion") ||
    text.includes("recursive") ||
    text.includes("kế thừa") ||
    text.includes("inheritance") ||
    text.includes("mro") ||
    text.includes("method resolution") ||
    text.includes("super().__init__") ||
    text.includes("constructor") ||
    text.includes("hàm dựng") ||
    text.includes("hàm hủy") ||
    text.includes("__init__") ||
    text.includes("__new__") ||
    text.includes("__del__") ||
    text.includes("__slots__") ||
    text.includes("__eq__") ||
    text.includes("__call__") ||
    text.includes("__len__") ||
    text.includes("__bool__") ||
    text.includes("name mangling") ||
    text.includes("classmethod") ||
    text.includes("staticmethod") ||
    text.includes("property") ||
    text.includes("abstractmethod") ||
    text.includes("isinstance") ||
    text.includes("hướng đối tượng") ||
    text.includes("polymorphism") ||
    text.includes("đa hình") ||
    text.includes("encapsulation") ||
    text.includes("đóng gói")
  ) {
    return Category.RECURSION_OOP;
  }

  // 5. Xử lý tệp & Thư viện
  if (
    text.includes("tệp") ||
    text.includes("file") ||
    text.includes("thư viện") ||
    text.includes("library") ||
    text.includes("libraries") ||
    text.includes("open(") ||
    text.includes("with open") ||
    text.includes("write(") ||
    text.includes("read(") ||
    text.includes("readline") ||
    text.includes("readlines") ||
    text.includes("import os") ||
    text.includes("import math") ||
    text.includes("import sys") ||
    text.includes("import random") ||
    text.includes("import json") ||
    text.includes("import copy") ||
    text.includes("shutil") ||
    text.includes("csv") ||
    text.includes("pathlib") ||
    text.includes("os.path") ||
    text.includes("pickle") ||
    text.includes("copy.copy") ||
    text.includes("copy.deepcopy") ||
    text.includes("generator") ||
    text.includes("yield") ||
    text.includes("deque") ||
    text.includes("collections") ||
    text.includes("import ")
  ) {
    return Category.FILES_LIBRARIES;
  }

  // 6. Gỡ lỗi & Kiểm thử
  if (
    text.includes("gỡ lỗi") ||
    text.includes("debugging") ||
    text.includes("kiểm thử") ||
    text.includes("testing") ||
    text.includes("try:") ||
    text.includes("except") ||
    text.includes("finally") ||
    text.includes("unboundlocalerror") ||
    text.includes("attributeerror") ||
    text.includes("keyerror") ||
    text.includes("valueerror") ||
    text.includes("nameerror") ||
    text.includes("typeerror") ||
    text.includes("exception") ||
    text.includes("raise") ||
    text.includes("assertion") ||
    text.includes("assert") ||
    text.includes("mock") ||
    text.includes("unittest") ||
    text.includes("pytest") ||
    text.includes("bug") ||
    text.includes("lỗi") ||
    text.includes("error") ||
    text.includes("traceback")
  ) {
    return Category.DEBUGGING_TESTING;
  }

  // 7. List, tuple, dictionary, set, slicing
  if (
    text.includes("list") ||
    text.includes("tuple") ||
    text.includes("dict") ||
    text.includes("dictionary") ||
    text.includes("set") ||
    text.includes("tập hợp") ||
    text.includes("slicing") ||
    text.includes("cắt lát") ||
    text.includes("comprehension") ||
    text.includes("unpacking") ||
    text.includes("mảng") ||
    text.includes("danh sách") ||
    text.includes("khóa") ||
    text.includes("hashing") ||
    text.includes("pop(") ||
    text.includes("append") ||
    text.includes("extend") ||
    text.includes("frozenset") ||
    text.includes("shallow") ||
    text.includes("deep copy") ||
    text.includes("mutable") ||
    text.includes("khả biến") ||
    text.includes("bất biến") ||
    text.includes("interning") ||
    text.includes("immutable") ||
    text.includes("s[") ||
    text.includes("a[") ||
    text.includes("d[") ||
    text.includes("matrix")
  ) {
    return Category.PYTHON_COLLECTIONS;
  }

  // 8. Hàm
  if (
    text.includes("hàm") ||
    text.includes("def ") ||
    text.includes("function") ||
    text.includes("return") ||
    text.includes("lambda") ||
    text.includes("scope") ||
    text.includes("cục bộ") ||
    text.includes("toàn cục") ||
    text.includes("global") ||
    text.includes("nonlocal") ||
    text.includes("parameter") ||
    text.includes("argument") ||
    text.includes("decorator") ||
    text.includes("closure")
  ) {
    return Category.PYTHON_FUNCTIONS;
  }

  // 9. Vòng lặp (Loops)
  if (
    text.includes("vòng lặp") ||
    text.includes("loop") ||
    text.includes("for ") ||
    text.includes("while") ||
    text.includes("break") ||
    text.includes("continue") ||
    text.includes("range(")
  ) {
    return Category.PYTHON_LOOPS;
  }

  // 10. Câu lệnh điều kiện
  if (
    text.includes("if ") ||
    text.includes("else") ||
    text.includes("elif") ||
    text.includes("điều kiện") ||
    text.includes("rẽ nhánh") ||
    text.includes("ternary") ||
    text.includes("so sánh rẽ nhánh")
  ) {
    return Category.PYTHON_CONDITIONS;
  }

  // 11. Toán tử, biểu thức, nhập - xuất (Default fallback)
  return Category.PYTHON_OPERATORS;
}

const seenIds = new Set<number>();
export const quizQuestions: Question[] = [...initialQuestions, ...new100QuizQuestions, ...newOet100Questions, ...th07Questions, ...th012th13Questions, ...moreThQuestions].map((q) => {
  let mappedId = q.id;
  while (seenIds.has(mappedId)) {
    mappedId += 100000;
  }
  seenIds.add(mappedId);
  const qWithUniqueId = { ...q, id: mappedId };
  if (qWithUniqueId.category === Category.PYTHON_BASICS) {
    return {
      ...qWithUniqueId,
      category: getDetailedPythonCategory(qWithUniqueId)
    };
  }
  return qWithUniqueId;
});

