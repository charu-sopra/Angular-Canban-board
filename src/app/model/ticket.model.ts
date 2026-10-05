export interface TicketRequest {

  title: string;

  description: string;

  ticketPriority: string;

  ticketStatus: string;
//we can change createdBy and updatedBy later for matching the datatype;
//   createdBy: number;

//   updatedBy: number;

}

export interface TicketResponse {

  id: number;
  title: string;
  description: string;
  ticketStatus: string;
  ticketPriority: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}

export interface TicketPageResponse {
  content: TicketResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}