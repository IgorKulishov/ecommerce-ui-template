import { Story, Meta } from '@storybook/angular/types-6-0';
import { AllOrdersContentComponent } from './all-orders-content.component';
import { ordersOnDate } from '../../../../../test/mock';

export default {
  title: 'AllOrdersContent',
  component: AllOrdersContentComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<AllOrdersContentComponent> = (args: AllOrdersContentComponent) => ({
  component: AllOrdersContentComponent,
  props: args,
});

export const AllOrdersContent = Template.bind({});
AllOrdersContent.args = {
  allOrdersDetails: [],
  ordersOnDate: ordersOnDate,
};
