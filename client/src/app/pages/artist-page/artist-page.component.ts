import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((data)=> {
      console.log('artist');
      console.log(data);
      this.artist=data;
    });
    this.spotifyService.getRelatedArtists(this.artistId).then((data)=> {
      console.log('related');
      console.log(data);
      this.relatedArtists = data;
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then((data)=> {
      console.log('top tracks');
      console.log(data);
      this.topTracks =data;
    });
    this.spotifyService.getAlbumsForArtist(this.artistId).then((data)=> {
      console.log('albums');
      console.log(data);
      console.log(data);
      this.albums =data;
    });
  }

}