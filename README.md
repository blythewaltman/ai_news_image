# AI News Image Repository

## Overview

The AI News Image repository is a web application that utilizes various technologies to provide a fun news browsing experience. The application is built using React for the front-end, Node.js with Express for the back-end server, and integrates AWS Comprehend API and DALL*E API for advanced natural language processing and image generation. Additionally, the NEWS API is employed to fetch real-time news articles.

## Installation

To run the application locally, follow these steps:

### Frontend

1. Navigate to the `ai_news_image_frontend` directory.
2. Run the command `npm install` to install the necessary dependencies.
3. Start the development server using `npm run start`.

### Backend

1. Navigate to the `ai_news_image_backend` directory.
2. Run `npm install` to install the required packages.
3. Start the server with the command `npm run start`.

Note: Before running the application, ensure that you have the required API keys for AWS Comprehend and DALL*E. These keys should not be public on the GitHub repository.

## Configuration

Ensure you have the following environment variables set in your backend environment:

- `AWS_ACCESS_KEY_ID`: AWS access key for Comprehend API
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for Comprehend API
- `AWS_DEFAULT_REGION`: AWS region used
- `OPEN_AI_API_KEY`: API key for DALL*E API
- `NEWS_API_KEY`: API key for NEWS API

## Usage

Once the application is running locally, open your browser and navigate to `http://localhost:3000` to access the AI News Image application.

## Contributing

If you wish to contribute to this project, feel free to submit pull requests or open issues. Your contributions are highly appreciated!

