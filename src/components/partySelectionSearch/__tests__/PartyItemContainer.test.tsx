import { render, fireEvent } from '@testing-library/react';
import PartyItemContainer from '../PartyItemContainer';

test('Test onKeyDownCapture behavior in PartyItemContainer component', () => {
  const actionMock = jest.fn();

  const title = 'mockPartyItem Title';
  const subTitle = 'mockPartyItem Subtitle';
  const image = 'mockPartyItemImage.jpg';

  const { getByTestId } = render(
    <PartyItemContainer
      selectedItem={false}
      title={title}
      subTitle={subTitle}
      image={image}
      action={actionMock}
      moreThan3Parties={false}
    />
  );

  const containerElement = getByTestId(`PartyItemContainer: ${title}`);
  fireEvent.keyDown(containerElement, { key: 'Enter' });

  expect(actionMock).toHaveBeenCalled();
});
