export function CallApiWorkplaces(api_key, workplace) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": 'Bearer ' + api_key
      },
      url: `https://app.asana.com/api/1.0/workspaces/${workplace}/projects`,
      processData: false,
      success: function(msg) {
        resolve(msg)
      }
    });
  })
}

export function CallGetProject(api_key, projectId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": 'Bearer ' + api_key
      },
      url: `https://app.asana.com/api/1.0/projects/${projectId}`,
      processData: false,
      success: function(msg) {
        resolve(msg)
      }
    });
  })
}

export function CallGetProjectTasks(projectId, api_key) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": 'Bearer ' + api_key
      },
      url: `https://app.asana.com/api/1.0/projects/${projectId}/tasks`,
      processData: false,
      success: function(msg) {
        resolve(msg)
      }
    });
  })
}
