## PROBLEMS

**SOLVED** problem was that the votePost mutation was not returning voteStatus along with the post (no idea why that broke everything though)

- whenever a user votes, the homePostsQuery is called again... why?
- voting ruins everything. im not updating the cache properly when voting. therfore whenever I vote on a paginated query, i get taken back to the initial query. I think if i performed a writefragment on the specic edge(cursor+node) it will update that post

  - when i try to readquery it doesnt work (see navbar/logout for an example of reading query from cache that does work)
  - REMOVE HOMEFEED PAGINATION AND JUST RETURN ALL POSTS TO SEE IF WE CAN RETRIEVE FROM CACHE THAT WAY. then work from there. try a manual pagination fieldpolicy instead of relayStylePagination()

#### TODO

- users should have an additional attribute [displayUsername] which is exactly how user entered it when signing up (uppercase or lowercase letters)
- [username] attribute should be converted to all lowercase for uniqueness (this is the username we check for to see if username is already in use)
- graphql subscriptions: when a user on a different client posts, all active client caches are updated to show that post
- 10:04 ->
