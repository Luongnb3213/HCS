export const FilterReducer = (state, action) => {
  switch (action.type) {
    case 'PRICE_DO_TODO':
      return {
        ...state,
        price: action.filterValue,
      };
    case 'PRICE_INPUT':
      let pricefilter = {
        low: '',
        high: '',
      };
      let position = action.typeFilter;
      pricefilter[position] = action.filterValue;
      let lastvalue = state.price.split(',');
      if (action.typeFilter == 'low') {
        pricefilter.high = lastvalue[1] ? lastvalue[1] : '';
      } else if (action.typeFilter == 'high') {
        pricefilter.low = lastvalue[0] ? lastvalue[0] : '';
      }

      return {
        ...state,
        price: pricefilter.low + ',' + pricefilter.high,
      };
    case 'SPECIALTY_DO_TODO':
      return {
        ...state,
        specialty: action.filterValue,
      };
    case 'MEDICAL_DO_TODO':
      return {
        ...state,
        numberPfMedicalAppointments: action.filterValue,
      };
    case 'REVIEW_DO_TODO':
      return {
        ...state,
        reviews: action.filterValue,
      };
    case 'UNDO_TODO':
      return {
        ...state,
        [action.typeFilter]: action.filterValue,
      };

    default:
      return state;
  }
};
