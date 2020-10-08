import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  FormControl, Validators } from '@angular/forms';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  addCommentForm;
  mycomments: Comment[] = [];
  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) 
  {
    this.addCommentForm = this.formBuilder.group({
      comment: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getComments();    
  }

  getComments(): void {
    this.commentService.getComments()
    .subscribe(serverComments => {      
      this.mycomments = serverComments;
    });
  }

  onSubmit(commentData) {    
    let newComment = commentData.comment.trim();
    if (!newComment) { return; }    
    this.commentService.addComment({ datetime: new Date(), commentText: newComment } as Comment)
      .subscribe(comment => {
        this.mycomments.push(comment);
      });
  }

  delete(comment: Comment): void {
    this.mycomments = this.mycomments.filter(c => c !== comment);
    this.commentService.deleteComment(comment).subscribe();
  }
}
