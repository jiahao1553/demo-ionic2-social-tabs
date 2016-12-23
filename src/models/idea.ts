export interface Idea {
  id: string;
  ideaOwner:string;
  ideaOwnerAvatar: string;
  description: string;
  mediaId: string;
  mediaType: string;
  area: string;
  updatedAt: string;
  status: string;
  likesNo: number;
  suggestionsNo: number;
  latestSuggestionOwner: string;
  latestSuggestion: string;
}
