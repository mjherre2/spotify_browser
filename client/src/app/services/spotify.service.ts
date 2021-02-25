import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var x = this.http.get(this.expressBaseUrl+endpoint).toPromise().then(result=>result);
    return x;
  }

  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    var ep = '/search/'+category+"/";
    resource = encodeURIComponent(resource);
    ep += resource; 
    var x;
    var z = [];
    var y;
    switch(category){
      case 'artist':
        return this.sendRequestToExpress(ep).then((data)=>{
          x= data['artists']['items'];
          for (var i =0; i< x.length; i++){
            z.push( new ArtistData(x[i]));
          }
          return z;
        });
      case 'track':
        return this.sendRequestToExpress(ep).then((data)=>{
          x= data['tracks']['items'];
          for (var i =0; i< x.length; i++){
            z.push( new TrackData(x[i]));
          }
          return z;
        });
      case 'album':
        return this.sendRequestToExpress(ep).then((data)=>{
          x= data['albums']['items'];
          for (var i =0; i< x.length; i++){
            z.push( new AlbumData(x[i]));
          }
          return z;
        });
      }
  }

  getArtist(artistId:string):Promise<ArtistData> {
    artistId = encodeURIComponent(artistId);
    var ep = "/artist/"+artistId;
    return this.sendRequestToExpress(ep).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    artistId = encodeURIComponent(artistId);
    var z = [];
    var ep = "/artist-related-artists/"+artistId;
    return this.sendRequestToExpress(ep).then((data)=>{
      for (var i =0; i< data['artists'].length;i++){
        z.push(new ArtistData(data['artists'][i]));
      }
      return z;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    artistId = encodeURIComponent(artistId);
    var z = [];
    var ep = "/artist-top-tracks/"+artistId;
    return this.sendRequestToExpress(ep).then((data)=>{
      for (var i =0; i< data['tracks'].length;i++){
        z.push(new TrackData(data['tracks'][i]));
      }
      return z;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    artistId = encodeURIComponent(artistId);
    var z = [];
    var ep = "/artist-albums/"+artistId;
    return this.sendRequestToExpress(ep).then((data)=>{
      for (var i =0; i< data['items'].length;i++){
        z.push(new TrackData(data['items'][i]));
      }
      return z;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    albumId = encodeURIComponent(albumId);
    var ep = "/album/"+albumId;
    return this.sendRequestToExpress(ep).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    var z = [];
    albumId = encodeURIComponent(albumId);
    var ep = "/album-tracks/"+albumId;
    return this.sendRequestToExpress(ep).then((data)=>{
      for (var i =0; i< data['items'].length;i++){
        z.push(new TrackData(data['items'][i]));
      }
      return z;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    trackId = encodeURIComponent(trackId);
    var ep = "/track/"+trackId;
    return this.sendRequestToExpress(ep).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    var z = [];
    trackId = encodeURIComponent(trackId);
    var ep = "/track-audio-features/"+trackId;
    return this.sendRequestToExpress(ep).then((data)=>{
      console.log("2")
      console.log(data.length);
      for (var x in data){
        z.push(new TrackFeature(x, data[x]));
      }
      return z;
    });
  }
}
