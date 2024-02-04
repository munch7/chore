import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  selectedSkill: string = '';
  filteredPosts: any[] = [];
  posts: any[] = [];

  ngOnInit() {
    this.getFormData();
    this.filterBySkill();
  }

  constructor(private http: HttpClient){}
  
  getFormData() {
    this.http.get('https://monkey-ec249-default-rtdb.europe-west1.firebasedatabase.app/form-data.json')
      .subscribe((data: any) => {
        console.log('Form data retrieved successfully:', data);
        
        // Check if data is an object, and extract values if needed
        if (data && typeof data === 'object') {
          this.posts = Object.values(data);
        } else {
          this.posts = data || [];
        }
      });
  }

  filterBySkill() {
    if (this.selectedSkill) {
      this.filteredPosts = this.posts.filter(post => post.skill === this.selectedSkill);
    } else {
      this.filteredPosts = this.posts;
    }
  }
  
}
