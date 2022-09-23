type IDeliveryOption = 'delivery' | 'pickup';

interface IDeliveryOptionProps {
  deliveryOption: IDeliveryOption;
  setDeliveryOption: Dispatch<SetStateAction<IDeliveryOption>>;
}

interface ITimeFrameTitleProps {
  isDelivery: boolean;
}

interface ITimeFrameSelectionBoxProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
}

interface TimeFrameContainerStyledProps {
  isSelected: boolean;
}
