export const setCurrentTopic = topicname => {
    return {
      type: 'SET_CURRENT_TOPIC',
      topic: topicname
    };
  };

export const setOrdering = dateorder => {
    return {
      type: 'SET_ORDERING',
      ordering: dateorder
    };
  };