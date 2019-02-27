import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Results from './Results'

configure({ adapter: new Adapter() })

describe('<Results />', () => {
  it('should render repositories listing', () => {
    const props = {
      match: {
        params: {
          query: 'php'
        }
      }
    }

    const wrapper = shallow(<Results {...props} />, {
      disableLifecycleMethods: true
    })
    wrapper.setState({
      repositories: [
        {
          id: 22183003,
          html_url: 'https://github.com/docker-library/php',
          name: 'php',
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/7739233?v=4',
            login: 'docker-library'
          },
          stargazers_count: 1894,
          language: 'Shell'
        },
        {
          id: 32465342,
          html_url: 'https://github.com/docker-library/php',
          name: 'php',
          owner: {
            avatar_url: 'https://avatars0.githubusercontent.com/u/7739233?v=4',
            login: 'docker-library'
          },
          stargazers_count: 1894,
          language: 'Shell'
        }
      ]
    })

    expect(wrapper.find('.results__card').length).toEqual(2)
  })
})
