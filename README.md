# HumanChain AI Safety Incident Log System

A comprehensive system for logging and managing AI safety incidents as part of HumanChain's mission to foster safer, more trustworthy AI systems. Includes both a RESTful API and a user-friendly web interface.

## Features

### API Features
- Log AI safety incidents with title, description, and severity level
- Retrieve all incidents or a specific incident by ID
- Delete incidents that are no longer relevant
- Data validation and error handling

### UI Features
- Interactive dashboard for incident management
- User-friendly form for creating new incidents
- Real-time incident log display
- Comprehensive API documentation page
- Responsive design for desktop and mobile devices

## Tech Stack

### Backend
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Template Engine**: EJS

### Frontend
- **HTML/CSS/JavaScript**
- **Responsive Design** with custom CSS
- **Client-side validation**

## Screenshots

[Consider adding screenshots of the dashboard and API docs page here]

## Installation

```bash
git clone https://github.com/your-username/humanchain-incident-system.git
cd humanchain-incident-system
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/incidentdb
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

Once running, access:
- Web Dashboard: http://localhost:3000/
- API Documentation: http://localhost:3000/api-docs

## Web Interface Routes

| Route        | Description                         |
|--------------|-------------------------------------|
| /            | Dashboard with incident form and log|
| /api-docs    | Interactive API documentation       |

## API Endpoints

| Method | URL             | Description               | Request Body                                      | Response                     |
|--------|-----------------|---------------------------|---------------------------------------------------|------------------------------|
| GET    | /incidents      | Get all incidents         | -                                                 | Array of incidents           |
| GET    | /incidents/:id  | Get incident by ID        | -                                                 | Single incident or 404 error |
| POST   | /incidents      | Create a new incident     | `{title, description, severity}`                  | Created incident with ID     |
| DELETE | /incidents/:id  | Delete incident by ID     | -                                                 | 204 No Content or 404 error  |

## API Usage Examples

### Get all incidents

```bash
curl http://localhost:3000/incidents
```

### Get incident by ID

```bash
curl http://localhost:3000/incidents/612f4a9b9b4c7e001c3e5dc1
```

### Create a new incident

```bash
curl -X POST \
  http://localhost:3000/incidents \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Biased Model Output",
    "description": "AI model producing biased results for minority groups",
    "severity": "High"
  }'
```

### Delete an incident

```bash
curl -X DELETE http://localhost:3000/incidents/612f4a9b9b4c7e001c3e5dc1
```

## Testing

The application includes comprehensive API tests using Jest and SuperTest. Tests verify all CRUD operations for incidents, including validation and error handling.

### Running Tests

```bash
npm test
```

This will execute the test suite and display results in the terminal. Tests run sequentially to ensure proper creation, reading, and deletion of test incidents.


## Data Schema

Each incident document in the database has the following structure:

```javascript
{
  id: ObjectId,                // MongoDB auto-generated unique identifier
  title: String,               // Short summary of the incident
  description: String,         // Detailed description
  severity: "Low" | "Medium" | "High", // Severity level
  reported_at: Date            // Timestamp (auto-generated)
}
```

## Browser Compatibility

The web interface has been tested and works with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT