
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../../app.component";
import {LoginData} from "../../types";

describe('LoginService', () => {

  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
