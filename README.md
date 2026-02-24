For the purpose of processing 1 million write events per minute, the system would migrate from direct database writes to an event-based system. 
The /track API would perform asynchronous writes to a message queue such as Kafka or RabbitMQ rather than synchronous writes to the database for event tracking. 
The background worker services would then handle the events and perform batch writes to the database. 
An analytics-friendly database and Redis caching would be utilized to handle dashboard queries, while pre-aggregated metrics would be utilized to handle real-time calculations. 
With the utilization of load balancing and horizontally scalable services, the system would be able to handle high traffic while still having fast response times.
