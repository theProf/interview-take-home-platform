export default {
  'diagram-1': {
    variables: {
      place: 'World',
    },
    nodes: {
      'node-1': {
        type: 'text',
        value: ['Hello ', {variableID: 'place'}],
        nextID: 'node-2'
      },
      'node-2': {
        type: 'text',
        value: 'Talk later!',
        nextID: null
      }
    }
  }
}
