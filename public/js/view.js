document.addEventListener('DOMContentLoaded', function() {
    const incidentDetail = document.getElementById('incident-detail');
    
    // Fetch incident by ID
    fetch(`/incidents/${incidentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          displayIncidentDetails(data.data);
        } else {
          showError('Incident not found');
        }
      })
      .catch(error => {
        console.error('Error fetching incident:', error);
        showError('Failed to load incident data. Please try again later.');
      });
    
    // Display incident details
    function displayIncidentDetails(incident) {
      const reportDate = new Date(incident.reported_at).toLocaleString();
      const createdDate = new Date(incident.createdAt).toLocaleString();
      
      const html = `
        <h2>${incident.title}</h2>
        <div class="incident-meta">
          <span class="severity severity-${incident.severity}">${incident.severity} Severity</span>
          <p>Reported: ${reportDate}</p>
        </div>
        
        <dl>
          <dt>Description:</dt>
          <dd>${incident.description}</dd>
          
          <dt>Created At:</dt>
          <dd>${createdDate}</dd>
          
          <dt>Incident ID:</dt>
          <dd>${incident._id}</dd>
        </dl>
        
        <div class="incident-actions">
          <a href="/" class="btn">Back to Dashboard</a>
          <button id="delete-btn" class="btn btn-danger">Delete Incident</button>
        </div>
      `;
      
      incidentDetail.innerHTML = html;
      
      // Add delete event listener
      document.getElementById('delete-btn').addEventListener('click', function() {
        deleteIncident(incident._id);
      });
    }
    
    // Delete incident
    function deleteIncident(id) {
      if (confirm('Are you sure you want to delete this incident?')) {
        fetch(`/incidents/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.status === 204) {
            alert('Incident deleted successfully');
            window.location.href = '/';
          } else {
            return response.json().then(data => {
              throw new Error(data.error || 'Failed to delete incident');
            });
          }
        })
        .catch(error => {
          console.error('Error deleting incident:', error);
          showError('Failed to delete incident. Please try again.');
        });
      }
    }
    
    // Show error message
    function showError(message) {
      incidentDetail.innerHTML = `
        <div class="error-card">
          <h2>Error</h2>
          <p>${message}</p>
          <a href="/" class="btn">Return to Dashboard</a>
        </div>
      `;
    }
  });