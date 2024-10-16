export const Filters = [
    {
      title: 'Khoảng giá',
      action: "PRICE",
      fitlerArray: [
        {
          title: '0 - 500K',
          value: '0,500000',
        },
        {
          title: '500k - 1000k',
          value: '500000,1000000',
        },
        {
          title: '1000k - 1,500k',
          value: '1000000,1500000',
        },
      ],
      type: 'price',
    },
    {
      title: 'Chuyên khoa',
      action: "SPECIALTY",
      fitlerArray: [
        {
          title: 'Giác mạc',
          value: 'Giác mạc',
        },
        {
          title: 'Chấn thương mắt',
          value: 'Chấn thương mắt',
        },
        {
          title: 'Tâm lý học lâm sàng',
          value: 'Tâm lý học lâm sàng',
        },
        {
          title: 'Mắt trẻ em',
          value: 'Mắt trẻ em',
        },
        {
          title: 'Thận tiết niệu',
          value: 'Thân tiết niệu',
        },
        {
          title: 'Phổi',
          value: 'Phổi',
        },
        {
          title: 'Dinh dưỡng',
          value: 'Dinh dưỡng',
        },
      ],
      type: 'specialty',
    },
    {
      title: 'Số lượt Đặt khám ',
      action: "MEDICAL",
      fitlerArray: [
        {
          title: 'Tăng dần',
          value: 'asd',
        },
        {
          title: 'Giảm dần',
          value: 'desc',
        },
      ],
      type: 'numberPfMedicalAppointments',
    },
    {
      title: 'Đánh giá',
      action: "REVIEW",
      fitlerArray: [
        {
          title: '5 sao',
          value: 5,
        },
        {
          title: 'Từ 4 sao',
          value: 4,
        },
        {
          title: 'Từ 3 sao',
          value: 3,
        },
        {
          title: 'Từ 2 sao',
          value: 2,
        },
        {
          title: 'Từ 1 sao',
          value: 1,
        },
      ],
      type: 'reviews',
    },
  ];