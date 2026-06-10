export const API_URL_RL ='http://localhost:9091';
export const API_URL_Order ='http://localhost:9094';
export const API_URL_FC ='http://localhost:9092';
export const API_URL_UD ='http://localhost:9093';

// AWS / remote deployment configuration (commented out for local testing)
// export const K8ExternalIp = 'http://k8s-default-awsingre-3d4b7f90d4-122545836.eu-west-3.elb.amazonaws.com';

// Local proxy mode: use same-origin routes and let Angular CLI forward them to the correct local backend ports.
export const K8ExternalIp = '';
