export interface Idea {
  id: string;
  ideaOwner:string;
  ideaOwnerNickname: string;
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
  latestSuggestionOwnerNickname: string;
  latestSuggestion: string;
}
