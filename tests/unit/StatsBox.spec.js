import StatsBox from '../../src/components/StatsBox.vue'
import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

describe('StatsBox', () => {
  it('displays 3 numbers with headers: Total, Completed, Not completed', () => {
    const { getByText, getByTestId } = render(StatsBox, {
      props: {
        data: [
          {
            id: 1,
            title: 'delectus aut autem',
            content: 'Lorem ipsum',
            status: 'New'
          },
          {
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            content: 'Lorem ipsum',
            status: 'Completed'
          },
          {
            id: 3,
            title: 'fugiat veniam minus',
            content: 'Lorem ipsum',
            status: 'Not completed'
          }
        ]
      }
    })
    getByText('Total')
    getByText('Completed')
    getByText('Not completed')

    expect(getByTestId('total')).toHaveTextContent('3')
    expect(getByTestId('completed')).toHaveTextContent('1')
    expect(getByTestId('not-completed')).toHaveTextContent('1')
  })
})
