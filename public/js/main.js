document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const incidentForm = document.getElementById('incident-form');
    const incidentsList = document.querySelector('.incidents-list');
    
    // Fetch all incidents
    fetchIncidents();
    
    // Event listener for form submission
    incidentForm.addEventListener('submit', createIncident);
    
    // Fetch all incidents from API
    function fetchIncidents() {
      fetch('/incidents')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            displayIncidents(data.data);
          } else {
            showError('Failed to load incidents');
          }
        })
        .catch(error => {
          console.error('Error fetching incidents:', error);
          showError('Failed to load incidents. Please try again later.');
        });
    }
    
    // Display incidents in the DOM
    function displayIncidents(incidents) {
      if (incidents.length === 0) {
        incidentsList.innerHTML = '<p>No incidents reported yet.</p>';
        return;
      }
      
      let output = '';
      incidents.forEach(incident => {
        const date = new Date(incident.reported_at).toLocaleDateString();
        
        output += `
          <div class="incident-item" data-id="${incident._id}">
            <div class="incident-header">
              <h3>${incident.title}</h3>
              <span class="severity severity-${incident.severity}">${incident.severity}</span>
            </div>
            <p>${incident.description.substring(0, 150)}${incident.description.length > 150 ? '...' : ''}</p>
            <div class="incident-meta">Reported on: ${date}</div>
            <div class="incident-actions">
              <a href="/view/${incident._id}" class="btn btn-sm">View Details</a>
              <button class="btn btn-sm btn-danger delete-btn" data-id="${incident._id}">Delete</button>
            </div>
          </div>
        `;
      });
      
      incidentsList.innerHTML = output;
      
      // Add event listeners to delete buttons
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteIncident);
      });
    }
    
    // Create new incident
    function createIncident(e) {
      e.preventDefault();
      
      const incident = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        severity: document.getElementById('severity').value
      };
      
      fetch('/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(incident)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Reset form
          incidentForm.reset();
          // Refresh incidents list
          fetchIncidents();
          alert('Incident created successfully');
        } else {
          showError(data.error || 'Failed to create incident');
        }
      })
      .catch(error => {
        console.error('Error creating incident:', error);
        showError('Failed to create incident. Please try again.');
      });
    }
    
    // Delete incident
    function deleteIncident(e) {
      if (confirm('Are you sure you want to delete this incident?')) {
        const id = e.target.dataset.id;
        
        fetch(`/incidents/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.status === 204) {
            // Remove from DOM
            e.target.closest('.incident-item').remove();
            if (incidentsList.children.length === 0) {
              incidentsList.innerHTML = '<p>No incidents reported yet.</p>';
            }
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
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      
      incidentsList.prepend(errorDiv);
      
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
  });