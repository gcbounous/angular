import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    loadedPosts: Post[] = [];
    isFetching: boolean = false;
    error: any = null;
    postFetchedSubscription: Subscription;

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.postFetchedSubscription = this.postService.postsFetched.subscribe(
            (response: { posts: Post[], error: string }) => {
                this.isFetching = false;
                this.loadedPosts = response.posts;
                console.log(response.error)
                this.error = response.error;
            }
        );
    }

    ngOnDestroy() {
        this.postFetchedSubscription.unsubscribe();
    }

    onCreatePost(postData: Post) {
        this.postService.createAndStorePost(postData.title, postData.content);
    }

    onFetchPosts() {
        this.isFetching = true;
        this.postService.fetchPosts();
    }

    onClearPosts() {
            this.postService.deletePosts().subscribe(
                () => this.loadedPosts = []
            );
    }

    onErrorOk() {
        this.error = null;
    }

}
