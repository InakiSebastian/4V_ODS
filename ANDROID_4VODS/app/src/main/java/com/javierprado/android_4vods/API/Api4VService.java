package com.javierprado.android_4vods.API;

import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Diffusion;
import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.List;
import java.util.Map;

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

    @GET("degree/{id}")
    Call<Degree> getDegreeById(@Path("id") int id);

    @GET("indicators/iniciatives/ods/grouped")
    Call<Map<String, Map<String, List<String>>>> getIniciativesByOdsGrouped();

    @GET("indicators/iniciatives/ods")
    Call<Map<String, List<String>>> getIniciativesByOds();
}
