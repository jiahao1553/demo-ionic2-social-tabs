export interface Idea {
  id: string;
  ideaOwner:string;
  ideaOwnerFullname: string;
  ideaOwnerAvatar: string;
  description: string;
  mediaId: string;
  mediaType: string;
  area: string;
  updatedAt: string;
  status: string;
  likes: string[];
  likesString: string;
  suggestionsNo: number;
  latestSuggestionOwner: string;
  latestSuggestionOwnerFullname: string;
  latestSuggestion: string;
}
