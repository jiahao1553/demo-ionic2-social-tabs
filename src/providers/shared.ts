import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../models/post';

/*
  Generated class for the Shared provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Shared {
  AreaSet: any = [];
  username: any;
  Post:Post[];
  constructor(public http: Http) {
    console.log('Hello Shared Provider');
    this.AreaSet = [
      {id: 'pl', value: 'Production-LCMS'},
      {id: 'aa', value: 'AAS'},
      {id: 'ar', value: 'ARES'},
      {id: 'bp', value: 'Button Up'},
      {id: 'ct', value: 'ChemTest'},
      {id: 'eo', value: 'EMOD'},
      {id: 'es', value: 'ESS'},
      {id: 'el', value: 'Engineering-LCMS'},
      {id: 'fa', value: 'Final Assembly'},
      {id: 'gc', value: 'GFM/CDS'},
      {id: 'io', value: 'Ion Optics'},
      {id: 'if', value: 'Ion Funnel'},
      {id: 'lo', value: 'Logistics'},
      {id: 'ms', value: 'Mass Filter'},
      {id: 'me', value: 'Material Engineering'},
      {id: 'md', value: 'Medusa/DEI'},
      {id: 'mt', value: 'Mirrors/Pulsers/Towers'},
      {id: 'nc', value: 'NCM'},
      {id: 'np', value: 'NPI'},
      {id: 'pc', value: 'Procurement'},
      {id: 'qd', value: 'Quad Driver'},
      {id: 'qq', value: 'Quality'},
      {id: 'rd', value: 'R&D'},
      {id: 'sf', value: 'SFC'},
      {id: 'sc', value: 'Scanner'},
      {id: 'sd', value: 'Source/Desolvation'},
      {id: 'tp', value: 'TIS/Planning'},
      {id: 'tr', value: 'Training'},
      {id: 'ot', value: 'Others'}
    ];
    this.username ='Anonymous';
    //temporary
    this.Post = [
      {
        PostBy: 'Albert', Avatar: 'http://img.kpopmap.com/2016/01/sm-rookies-kun-profile.jpg',
        Topic: 'Who made the Wikipedia?', Description: 'Sanger and Wales founded Wikipedia. While Wales is credited with defining the goal of making a publicly editable encyclopedia, Sanger is credited with the strategy of using a wiki to reach that goal. On January 10, 2001, Sanger proposed on the Nupedia mailing list to create a wiki as a "feeder" project for Nupedia',
        PostOn: '5 Nov, 2016', Image: 'http://www.freewebheaders.com/wordpress/wp-content/gallery/beautiful-landscape/pink-purple-sky-and-spring-nature-landscape-header.jpg',
        Area: 'Production-LCMS', Likes: 1, Comments: 10, Progress: 'Open'
      },
      {
        PostBy: 'John', Avatar: 'http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg',
        Topic: 'Barack Obama', Description: 'Barack Hussein Obama II is an American politician who is the 44th and current President of the United States. He is the first African American to hold the office and the first president born outside the continental United States',
        PostOn: '4 Nov, 2016', Image: 'http://onfocusproduction.com/wp-content/uploads/2016/08/1135940-pictures-of-landscape-hd.jpg',
        Area: 'AAS', Likes: 9, Comments: 2, Progress: 'Progress'
      },
      {
        PostBy: 'Kelly', Avatar: 'https://profile.microsoft.com/RegsysProfileCenter/Images/personal_info.jpg',
        Topic: 'Donald Trump', Description: 'Donald John Trump is an American businessman, reality television personality, real estate mogul and President-elect of the United States.',
        PostOn: '1 Oct, 2016', Image: 'https://static.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg',
        Area: 'Others', Likes: 3, Comments: 7, Progress: 'Closed'
      },
      {
        PostBy: 'John', Avatar: 'http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg',
        Topic: 'Barack Obama', Description: 'Barack Hussein Obama II is an American politician who is the 44th and current President of the United States. He is the first African American to hold the office and the first president born outside the continental United States',
        PostOn: '4 Nov, 2016', Image: 'http://onfocusproduction.com/wp-content/uploads/2016/08/1135940-pictures-of-landscape-hd.jpg',
        Area: 'AAS', Likes: 9, Comments: 2, Progress: 'Progress'
      },
      {
        PostBy: 'Kelly', Avatar: 'https://profile.microsoft.com/RegsysProfileCenter/Images/personal_info.jpg',
        Topic: 'Donald Trump', Description: 'Donald John Trump is an American businessman, reality television personality, real estate mogul and President-elect of the United States.',
        PostOn: '1 Oct, 2016', Image: 'https://static.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg',
        Area: 'Others', Likes: 3, Comments: 7, Progress: 'Closed'
      },
      {
        PostBy: 'Albert', Avatar: 'http://img.kpopmap.com/2016/01/sm-rookies-kun-profile.jpg',
        Topic: 'Who made the Wikipedia?', Description: 'Sanger and Wales founded Wikipedia. While Wales is credited with defining the goal of making a publicly editable encyclopedia, Sanger is credited with the strategy of using a wiki to reach that goal. On January 10, 2001, Sanger proposed on the Nupedia mailing list to create a wiki as a "feeder" project for Nupedia',
        PostOn: '5 Nov, 2016', Image: 'http://www.freewebheaders.com/wordpress/wp-content/gallery/beautiful-landscape/pink-purple-sky-and-spring-nature-landscape-header.jpg',
        Area: 'Production-LCMS', Likes: 1, Comments: 10, Progress: 'Open'
      },
      {
        PostBy: 'Albert', Avatar: 'http://img.kpopmap.com/2016/01/sm-rookies-kun-profile.jpg',
        Topic: 'Who made the Wikipedia?', Description: 'Sanger and Wales founded Wikipedia. While Wales is credited with defining the goal of making a publicly editable encyclopedia, Sanger is credited with the strategy of using a wiki to reach that goal. On January 10, 2001, Sanger proposed on the Nupedia mailing list to create a wiki as a "feeder" project for Nupedia',
        PostOn: '5 Nov, 2016', Image: 'http://www.freewebheaders.com/wordpress/wp-content/gallery/beautiful-landscape/pink-purple-sky-and-spring-nature-landscape-header.jpg',
        Area: 'Production-LCMS', Likes: 1, Comments: 10, Progress: 'Open'
      },
      {
        PostBy: 'John', Avatar: 'http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg',
        Topic: 'Barack Obama', Description: 'Barack Hussein Obama II is an American politician who is the 44th and current President of the United States. He is the first African American to hold the office and the first president born outside the continental United States',
        PostOn: '4 Nov, 2016', Image: 'http://onfocusproduction.com/wp-content/uploads/2016/08/1135940-pictures-of-landscape-hd.jpg',
        Area: 'AAS', Likes: 9, Comments: 2, Progress: 'Progress'
      },
    ]
  }
}
