package com.javierprado.android_4vods.API;

import com.javierprado.android_4vods.models.Diffusion;
import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface Api4VService {
    @GET("iniciatives")
    Call<List<IniciativeCard>> getIniciatives();
    @GET("iniciatives/{id}")
    Call<Iniciative> getIniciative(@Path("id") int id);
    @GET("iniciatives/count")
    Call<Integer> getIniciativesCount();
    @GET("diffusion")
    Call<List<Diffusion>> getDiffusions();
}
