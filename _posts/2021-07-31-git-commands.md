---
title: Những câu lệnh thường dùng trong Git
categories:
- Programming
excerpt: "Developer không thể sống thiếu Git được phải không nào? Bên cạnh một số câu lệnh đơn giản chúng ta sử dụng hằng ngày, chúng ta cùng tìm hiểu kỹ lại một lần nữa những câu lệnh từ cơ bản đến nâng cao."
feature_image: /assets/imgs/git-commands-feature-image.jpg
---

### Tóm tắt nếu bạn không muốn đọc nhiều
Ngoài những lệnh Git thông thường bạn nên biết như `git clone`, `git add`, `git commit`, `git checkout`, `git merge`, `git init`, `git status`, `git push`, `git pull`, `git fetch`, `git log`, `git merge`, `git stash`. Những lệnh này đa số dễ hiểu và thông dụng.

Bạn nên dành thời gian tìm hiểu thêm một số lệnh đặc biệt trong git như `git rebase`, `git reset`, `git revert`.

Một số lệnh thường dùng trong Git:

```sh
# 1. Chuyển qua làm việc trên nhánh feature
git checkout feature
git checkout master
git checkout -b new-branch

# Bạn có thể checkout từ một commit và sau đó nó tạo thành một Detached HEAD
# nên lưu ý trường hợp này bên dưới nếu ko muốn mất nhánh :)
git checkout HEAD~3
git checkout commit-id
git checkout commit-id -b new-branch

# 2. merge code từ nhánh master vào nhánh feature
git checkout feature
git merge master

# 3. rebase code cho nhánh feature: merge code từ nhánh master vào nhánh 
# feature và đổi "base" cho nhánh feature - tham khảo "base" là gì bên dưới
git checkout feature
git rebase master

# 4. Xoá lệnh merge vừa thực hiện
git merge --abort

# 5. Git fetch
git fetch
git fetch origin master:master

# 6. Sự khác nhau giữa git reset vs. git revert
# Những option khi reset --mixed, --soft, --hard
git reset HEAD~2
git reset commit-id

git revert HEAD~1
git revert commit-id

# 7. Sử dụng cherry-pick
git cherry-pick commit-id

# 8. Lưu lại những file thay đổi khi checkout qua nhánh khác
git stash
git stash push
git stash push -m "my-stash"
git stash pop
git stash apply stash@{2}
git stash list
git stash clear

# 9. Push code lên remote
git push
git push --set-upstream origin my-branch
```

`git rebase` – giúp cho history sạch đẹp hơn, nhưng nguy hiểm nếu bạn rebase **master** hoặc **main**. Bạn có thể tham khảo thêm [những quy tắc vàng của rebase](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing). Tóm lại nên sử dụng git merge, nếu cần thiết chỉ sử dụng `rebase` trên nhánh feature, ko được rebase nhánh public như **master**.

`git fetch origin master:master` – khi bạn đang đứng ở một nhánh feature bạn có thể pull code mới nhất của **master** mà ko cần checkout qua **master** để pull.

Bên cạnh `commit-id`, chúng ta có thể chỉ định cha của `HEAD` (ví dụ `HEAD~1` là cha của `HEAD`, `HEAD~2` là cha của `HEAD~1`,…) để git revert hay reset về vị trí một commit trên history của một nhánh. Ví dụ chúng ta đang đứng trên nhánh **master**, chúng ta có thể hình dung sơ đồ các `HEAD` được đánh thứ tự như sau:

![git-commands-head](/assets/imgs/git-commands-head.jpg)

### Kiến thức chung
Bạn có thể tự hỏi rằng tại sao mỗi `commit-id` trong Git lại là một chuỗi ký tự lằng nhằng khó nhớ. Bởi vì đó là cách mà Git nhận biết thay đổi khi chúng ta sửa một file nào đó, git sẽ tiến hành chạy giải thuật hash lại tất cả content và chỉ cần thay đổi một ký tự trong một file thì một hash mới sẽ được tạo (giải thuật SHA1), mỗi hash như là một `commit-id`, nó là duy nhất trong history.

![git-commands-hash](/assets/imgs/git-commands-hash.png)

Những commit trong Git như là một danh sách liên kết, mỗi commit chứa thông tin về: commit-id, tree, parent (trỏ về commit trước đó), author, ...

### Một git model điển hình

![git-commands-staging-workflow](/assets/imgs/git-commands-staging-workflow.png)

Chúng ta sẽ tìm hiểu kỹ hơn về git commands trong phần tiếp theo.

### git init
Tạo mới một Git **repo** và add thư mục **.git** vào trong dự án của bạn.

Thông thường để cho đơn giản, bạn có thể lên Github vào tạo một **repo** rỗng (ko có `README.md` file) từ đầu và sau đó sử dụng một số lệnh Github đề nghị để tạo một **repo** liên kết giữa ***remote*** và ***local*** như sau:

```sh
echo "# myapp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:tienbku/myapp.git
git push -u origin main
```

### git clone
Clone một **repo** có sẵn trên github. Bạn có thể clone bằng HTTPS link hay SSH links. Thực chất bên trong `git clone`, đầu tiên nó sẽ chạy `git init` trước, sau đó `git clone` sẽ copy tất cả files từ ***remote*** về ***local***.

### git add
Thêm những file mà bạn đã tạo mới hay sửa đỗi trong working directory lên **stage** area.

```sh
# thêm một file cụ thể vào **stage**
git add <file>

# thêm tất cả các file đang bị thay đổi vào **stage**
git add .
```

![git-commands-basic-usage](/assets/imgs/git-commands-basic-usage.svg)

Trong sơ đồ ở trên chúng ta có 3 thành phần:

- ***Working Directory*** là thư mục chúng ta đang làm việc, bao gồm những file ở máy local.
- ***Staging Area*** (hay là *Index*) là khu vực lưu những file chuẩn bị được commit.
- ***History*** (hay là *Commit Area*) là khu vực lưu tất cả những file sau khi commit từ Staging Area.

Một flow thông thường là chúng ta sửa một vài file ở ***Working Directory*** (local) => sau đó chúng ta sử dụng `git add` để đẩy những file đó lên ***Stage*** và sau đó sử dụng `git commit` để commit lên ***History*** của Git.

- `git add <file>`, `git add -a`, `git add .`
- `git reset <file>` hoặc `git reset HEAD~1` hay `commit-id`
- `git checkout <file>`

Bạn có thể sử dụng `git status` để kiểm tra xem hiện tại những file của mình đang sửa đổi ở trạng thái nào (local, staging, hay đã commit).

### git commit
Khi bạn có một commit mới `f0cec` thì `HEAD` và con trỏ được di chuyển tới commit đó và nó trỏ về cha của nó là commit `ed489`.

Minh hoạ cho `git commit`:

![git-commands-commit](/assets/imgs/git-commands-commit.svg)

Khi bạn lỡ commit sai message bạn có thể sử dụng lệnh: `git commit --amend -m "Update commit message"` để sửa đổi lại commit trước đó mà nó sẽ không tạo thêm commit mới.

![git-commands-commit-amend](/assets/imgs/git-commands-commit-amend.svg)

***Những lưu ý khi sử dụng git commit***
- Nên chia nhỏ commit theo từng mục đích, nên tránh sử dụng `git add .` để commit tất cả các file.
- Commit nhỏ giúp người review code dễ đọc và hiểu code bạn hơn.
- Commit nhỏ dễ reset và revert code hơn.
- Viết commit message rõ ràng về thay đổi của bạn, đảm bảo người đọc hiểu bạn thay đổi gì.

### git checkout
Dùng để thay đổi branch làm việc, hay bạn có thể checkout một commit trước đó trên branch hiện tại của bạn.

Bạn đang ở branch **main** và checkout qua branch **stable**.

![git-commands-checkout-branch](/assets/imgs/git-commands-checkout-branch.svg)

Hay bạn có thể dùng checkout để tạo branch mới (branch **new**) hoàn toàn từ một branch và chuyển qua làm việc trên branch mới tạo. Ví dụ như:

![git-commands-checkout-b-detached](/assets/imgs/git-commands-checkout-b-detached.svg)

### git pull, push, fetch
- `git pull`: lấy code mới nhất từ ***remote*** về ***Working directory*** (local).
- `git push`: đưa những thay đổi ở local branch lên remote branch.
- `git fetch`: lấy tất cả thay đổi ở ***remote*** về local, ví dụ như: có tag mới, branch mới ở ***remote***.

### Detached HEAD
Thỉnh thoảng bạn muốn checkout từ một `commit-id` của một nhánh (để chỉ muốn tạo một nhánh mới từ những thay đổi của commit đó). Bạn có thể sử dụng lệnh:

```sh
git check <commit-id>

git checkout HEAD~3
```

![git-commands-checkout-detached](/assets/imgs/git-commands-checkout-detached.svg)

Sau khi HEAD trỏ về commit `b325c`, chúng ta có một `Detached HEAD` như sau:

![git-commands-commit-detached](/assets/imgs/git-commands-commit-detached.svg)

Với `Detached HEAD` nếu bạn không tạo một nhánh từ đây thì khi bạn checkout sang nhánh khác (ví dụ nhánh **main**) thì `Detached HEAD` sẽ mất.

Cho nên nếu bạn muốn lưu lại `Detached HEAD`, bạn phải tạo một nhánh mới như sau:

![git-commands-checkout-b-detached](/assets/imgs/git-commands-checkout-b-detached.svg)

Bạn chạy lệnh `git checkout -b new` để tạo một nhánh mới hoàn toàn từ `Detached HEAD`. Và bạn đã lưu nhánh **new** lại, bạn có thể tự do checkout sang nhánh khác.

Hay bạn có thể thực hiện quá trình này bằng cú pháp rút gọn như sau:

```sh
git checkout <commit-id> -b new
```

Lệnh này vừa checkout từ một commit và sau đó tạo một nhánh mới tên **new**.

### git reset
`git reset` dùng để thay đổi con trỏ trong một branch về một commit trước đó. Và nó sẽ thay đổi ***Working Directory*** và ***Stage*** của nhánh hiện tại chúng ta đang đứng.

Ví dụ như chúng ta reset con trỏ về `HEAD~3` (trỏ về trước HEAD 3 commit) trên một nhánh như sau:

![git-commands-reset-commit](/assets/imgs/git-commands-reset-commit.svg)

Working directory và staging sẽ thay đổi dựa vào những option bạn chọn như sau:

- `--mixed` (default): giữ lại những file bạn đang sửa trên ***disk*** (***Working Directory***), xoá những file trên ***Stage***.
- `--soft`: giữ lại những file hiện tại bạn đang sửa trên ***disk*** và ***Stage***. Chuyển commit nhưng ko làm thay đổi file đang sửa và ko xoá file trên ***Stage***.
- `--hard`: xoá bỏ tất cả files thay đổi trên ***disk*** và ***Stage***. Tất cả những file trên ***disk*** và trên ***Stage*** đều bị reset về giống hệt như commit ở `HEAD~3`.

Nếu bạn không truyền `commit-id` thì mặc định là `git reset HEAD`. Nó không làm thay đổi con trỏ trên branch nhưng nó sẽ xoá file bạn đang thay đổi tuỳ thuộc vào option (`--mixed`, `--soft`, `--hard`) mà bạn chọn.

![git-commands-reset](/assets/imgs/git-commands-reset.svg)

### git revert

`git reset` không tạo mới commit, trong khi đó `git revert` sẽ "undo" lại tất cả những thay đổi của một commit mà chúng ta chỉ định và tạo mới một commit mới trên ***History***.

![git-commands-revert](/assets/imgs/git-commands-revert.png)

Lệnh `git revert C2` sẽ tạo ra một commit mới `C4` và undo lại tất cả thay đổi của commit `C2`.

### git merge
Merge có nghĩa là lấy tất cả thay đổi của một nhánh khác để apply cho nhánh đang đứng. Ví dụ merge **master** branch vào **feature** branch hay ngược lại merge **feature** branch vào **master** branch để release một bản production mới.

Bạn đang đứng ở **feature** và chạy `git merge master`.

![git-commands-merge](/assets/imgs/git-commands-merge.png)

Tất cả những commit, thay đổi (màu xanh dương) sẽ được merge vào nhánh **feature** (màu xanh lá) và tạo thành một commit mới ở cuối nhánh **feature**. Hai commit màu xanh dương được gộp vào một commit màu xanh lá.

### git rebase
Cũng giống như `git merge`, `git rebase` sẽ lấy tất cả thay đổi của một nhánh khác để apply cho nhánh đang đứng. Nhưng với ***History*** đẹp hơn `git merge`.

Vi dụ: bạn đang đứng ở branch **topic** và chạy `git rebase main`.

![git-commands-rebase](/assets/imgs/git-commands-rebase.svg)

Sau khi chạy lệnh rebase thì nhánh **topic** sẽ chứa tất cả những commit mới của **main**. Và hai commit màu vàng được thay thế cho 2 commit cũ trên nhánh topic (mỗi tên gạch nối). Và hiện tại nhánh topic sẽ bao gồm **6 commit** (**2** commit trên nhánh **topic** trước khi rebase và **4** commit của nhánh **main**).

Với rebase để dễ hình dung, bạn có thể hiểu rebase có nghĩa là thay đổi "base" của một nhánh (ví dụ ở đây là nhánh **topic**). Trước khi rebase, "base" của nhánh **topic** trỏ vào commit `a47c3`, nhưng sau khi rebase, chúng ta chỉ đơn giản đổi "base" trỏ về `HEAD` của ***main*** (commit `da985`).

`git rebase` không thêm node mới (commit mới) vào ***History*** như `git merge` (trước và sau rebase chỉ có 6 commit – không tạo thêm commit thừa cho ***History*** – clean history)

Và khi đọc vào ***History*** của nhánh **topic** sau khi rebase bạn nhìn thấy được những thay đổi gì đã xảy ra trên nhánh **main** với các commit `a47c3`, `b325c`, `c10b9`, `da985`.

Khác với `git merge`, trong hợp này nếu bạn chạy `git merge main` thì khi nhìn vào ***History*** của nhánh **topic** bạn sẽ không thấy những commit từ **main**, bởi vì nó đã gom lại chỉ một commit duy nhất như sau:

![git-commands-merge-main](/assets/imgs/git-commands-merge-main.png)

Tuỳ thuộc vào bạn chọn `git rebase` hay `git merge`, nhưng tôi thường sử dụng `git merge` vì tôi không cần một clean history và đôi khi `git rebase` gây khó hiểu và cách sử dụng của `git merge` dễ hiểu hơn đối với tôi.

Bạn có thể thấy giải thích cách hoạt động của rebase khá khó và gây nhầm lẫn cho nhiều dev. Nên để đơn giản bạn có thể sử dụng `git merge`.

`git rebase` giúp cho history sạch đẹp hơn, nhưng nguy hiểm nếu bạn rebase **master** hoặc **main** branch. Bạn có thể tham khảo thêm [những quy tắc vàng của rebase](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing).

Tóm lại nên sử dụng `git merge`, nếu cần thiết chỉ sử dụng rebase trên nhánh **feature**, không được rebase nhánh public như **master**.

### git cherry-pick
`git cherry-pick` tạo ra một bản copy của một commit từ một nhánh khác và apply vào nhánh hiện tại với cùng message và thay đổi từ commit đó.

![git-commands-cherry-pick](/assets/imgs/git-commands-cherry-pick.svg)

Bạn đang đứng ở nhánh **main** và cherry-pick một commit `2c33a` từ nhánh **topic** vào nhánh **main**. Kết quả như hình trên, có một commit mới `f142b` được tạo ra trên nhánh **main**.

### git stash
Khi bạn thay đổi một số file và bạn muốn checkout sang nhánh khác. Lúc này git sẽ không cho bạn checkout sang nhánh khác nếu bạn chưa commit những thay đổi hiện tại, hay nếu bạn cố tình đi qua nhánh khác có thể những file bạn đang thay đổi (sửa, thêm) sẽ bị mất.

Trong trường hợp này bạn có thể dùng `git stash` dùng để lưu lại những thay đổi trên working directory để sử dụng lại sau này.

Một số lệnh `git stash` thường dùng:
- `git stash` (tạo một stash)
- `git stash push` (tạo một stash), `git stash push -m "my-stash"` (tạo một stash với message để dễ nhớ)
- `git stash pop stash@{2}` (xoá một stash) – `stash@{2}` được lưu như một stash id trong danh sách các stash, stash list là một ngăn xếp (stack)
- `git stash apply stash@{2}` (apply stash trở lại nhánh hiện tại)
- `git stash list` (liệt kê tất cả các stash)
- `git stash clear` (xoá tất cả stash)

Nguồn: [thaunguyen.com](http://thaunguyen.com/blog/software/giai-thich-chi-tiet-nhung-cau-lenh-thuong-dung-trong-git)