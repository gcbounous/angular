import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private api_path = 'https://ng-test-project-44b45.firebaseio.com/posts.json';

    postsFetched = new Subject<{posts: Post[], error: any}>();
    
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post = new Post(title, content);

        this.http
            .post<{ name: string }>(
                this.api_path,
                postData,
                {
                    observe: 'response'
                }
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchPosts(){
        this.http
            .get<{ [key: string]: Post }>(
                this.api_path, 
                { 
                    headers: new HttpHeaders({ 'Custom-Header': 'hello' }),
                    params: new HttpParams().append('print', 'pretty'),
                    responseType: 'json'
                }
            )
            .pipe(map(responseData => {
                const responseArray: Post[] = [];
                for (const key in responseData) {
                    responseArray.push({ ...responseData[key], 'id': key });
                }
                return responseArray;
            }))
            // .catchError(errorResponse => {
            //     // send things to analytics server, etc...
            //     return throwError(errorResponse);
            // })
            .subscribe(
                (posts) => { this.postsFetched.next({'posts': posts, 'error': null});
            },
                (error) => { this.postsFetched.next({ 'posts': [], 'error': error })
            });
    }

    deletePosts(){
        return this.http.delete(
            this.api_path,
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(event => {
                console.log(event);

                if (event.type === HttpEventType.Sent) {
                    // ...
                }

                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }

            })
        );
    }
}
