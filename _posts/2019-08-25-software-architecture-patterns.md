---
title: 10 Common Software Architectural Patterns
categories:
- Programming
excerpt: "Explaining common different architecture patterns with their usage, pros and cons."
feature_image: /assets/imgs/software-architecture-patterns-feature.png
---

_Bài gốc:_ [10 Common Software Architectural Patterns in a nutshell](https://towardsdatascience.com/10-common-software-architectural-patterns-in-a-nutshell-a0b47a1e9013)<br>
_Bài dịch:_ [Grokking Vietnam](https://engineering.grokking.org/10-common-software-architectural-patterns-in-a-nutshell)

### 1. Layered pattern

Thường được sử dụng cho các ứng dụng được tạo thành bởi các nhóm nhỏ phụ trách các nhiệm vụ khác nhau, Mỗi layer cung cấp service cho các layer nằm phía trên. Có 4 layer chính thường thấy trong kiến trúc này là:

- Presentation layer (UI layer)

- Application layer (service layer)

- Business logic layer (domain layer)

- Data access layer (persistent layer )

Thường được sử dụng cho các ứng dụng desktop và e-commerce.

{% include figure.html image="/assets/imgs/software-architecture-layer-pattern.png" caption="Layered pattern" %}

### 2. Client-server pattern:

Kiến trúc này bao gồm 2 thành phần: 1 server và các clients. Các client gửi request tới server để xử lý và trả các service tương ứng cho phía client. Kiến trúc này thường sử dụng cho các ứng dụng online như email, chia sẻ tài liệu và ngân hàng.

{% include figure.html image="/assets/imgs/software-architecture-client-server-pattern.png" caption="Client-server pattern" %}

### 3. Master-slave pattern

Kiến trúc này bao gồm 1 master và nhiều slave. Trong đó máy chủ (master) sẽ gửi dữ liệu đến các máy con (slaves) bất kể máy con có cần hay không. Thường được sử dụng trong database replication. Dữ liệu có thể được đọc và ghi vào master sau đó sao chép không đồng bộ vào các slave (việc đọc cũng có thể tiến hành trên một trong các slave).

{% include figure.html image="/assets/imgs/software-architecture-master-slave-pattern.png" caption="Master-slave pattern" %}

### 4. Pipe-filter pattern:

Kiến trúc này có thể dùng để cấu trúc hệ thống phục vụ cho mục đích sản xuất và xử lý luồng dữ liệu. Mỗi bước xử lý dữ liệu dược gói gọn trong một thành phần bộ lọc (filter). Dữ liệu cần xử lý được truyền qua các đường ống (pipe). Các pipe được dùng cho mục đích xử lý đồng bộ hoặc buffering.

Kiến trúc này thường được dùng để thiết kế các compiler hoặc quy trình xử lý bioinformatics.

{% include figure.html image="/assets/imgs/software-architecture-pipe-filter-pattern.png" caption="Pipe-filter pattern" %}

### 5. Broker pattern:

Được sử dụng cho các hệ thống phân tán gồm các thành phần tách rời. Các thành phần này tương tác với nhau bằng các yêu cầu dịch vụ từ xa. Broker chịu trách nhiệm điều phối tương tác giữa các thành phần.

Thường được sử dụng trong các phần mềm message broker như Apache ActiveMQ, Apache Kafka, RabbitMQ và JBoss Messaging.

{% include figure.html image="/assets/imgs/software-architecture-broker-pattern.png" caption="Broker pattern" %}

### 6. Peer-to-peer pattern:

Mỗi component trong kiến trúc này được gọi là một peer. Peer có thể hoạt động như một client - gửi request tới các peer khác, hoặc hoạt động như một server, cung cấp service cho các peer khác, vai trò hoạt động có thể thay đổi linh hoạt theo thời gian.

Thường được sử dụng trong các mạng chia sẻ file như Gnutella hoặc các giao thức multimedia như P2PTV và PDTP.

{% include figure.html image="/assets/imgs/software-architecture-peer-to-peer-pattern.png" caption="Peer-to-peer pattern" %}

### 7. Event-bus pattern:

Kiến trúc này thường dùng để xử lý các event, bao gồm 4 thành phần chính: event source, event listener, channel và event bus. Message được gửi tới các channel cụ thể của một event bus. Các listener nhận thông tin từ các channel nhất định và nhận thông báo mỗi khi có message được gửi tới channel đó.

Thường được sử dụng trong phát triển Android và notification service.

{% include figure.html image="/assets/imgs/software-architecture-event-bus-pattern.png" caption="Event-bus pattern" %}

### 8. Model-View-Controller:

Kiến trúc này chia ứng dụng làm ba thành phần chính:

- Model: Bao gồm dữ liệu và các chức năng chính

- View: Hiển thị thông tin, giao diện cho người dùng

- Controller: Xử lý các input từ phía người dùng.

Là kiến trúc thường dùng trong các ứng dụng web ở phần lớn các ngôn ngữ lập trình và trong các web frameworks như Django hay Ruby on Rails.

{% include figure.html image="/assets/imgs/software-architecture-model-view-controller-pattern.png" caption="Model-View-Controller" %}

### 9. Blackboard pattern:
This pattern is useful for problems for which no deterministic solution strategies are known.

Kiến trúc gồm 3 thành phần chính:

- Blackboard: Một vùng không gian chung dùng để lưu trữ thông tin

- Knowledge source: Gồm các module chuyên biệt xử lý dữ liệu lấy từ blackboard, sau đó trả lại kết quả vào blackboard.

- Control component: Phụ trách việc lựa chọn, tùy chỉnh và thực thi các module.

All the components have access to the blackboard. Components may produce new data objects that are added to the blackboard. Components look for particular kinds of data on the blackboard, and may find these by pattern matching with the existing knowledge source.

Kiến trúc này thường sử dụng trong các ứng dụng về robotics, nhận dạng giọng nói, nhận dạng và theo dõi phương tiện giao thông, nhận dạng cấu trúc protein.

{% include figure.html image="/assets/imgs/software-architecture-blackboard-pattern.png" caption="Blackboard pattern" %}

### 10. Interpreter pattern:

Thường được sử dụng để thiết kế component thông dịch các chương trình được viết bởi các ngôn ngữ cụ thể. Thường dùng trong các ngôn ngữ truy vấn cơ sở dữ liệu như SQL hoặc các ngôn ngữ mô tả giao thức truyền thông.

{% include figure.html image="/assets/imgs/software-architecture-interpreter-pattern.png" caption="Interpreter pattern" %}

### Summary: Pros & Cons

{% include figure.html image="/assets/imgs/software-architecture-patterns-pros-cons.png" caption="Comparison of Architectural Patterns" %}