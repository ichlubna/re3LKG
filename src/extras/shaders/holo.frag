uniform sampler2D tex0;
uniform float u_holoTilt;
uniform int u_holoCols;
uniform int u_holoRows;
uniform float u_holoPitch;
uniform float u_holoCenter;
uniform float u_holoViewPortionElement;
uniform float u_holoSubp;
uniform vec2 u_holoMaxUV;

FSIN vec4 v_color;
FSIN vec2 v_tex0;
FSIN float v_fog;

vec2
texArr(vec3 uvz)
{
    int viewsCount = u_holoCols * u_holoRows;
    float z = floor(uvz.z * viewsCount);
    float x = (mod(z, u_holoCols) + uvz.x) / u_holoCols;
    float y = (floor(z / u_holoCols) + uvz.y) / u_holoRows;
    return vec2(x, y) * vec2(u_holoViewPortionElement, u_holoViewPortionElement);
}

void
main(void)
{
    float invView = 1.0f;
    int ri = 0;
    int bi = 2;

    vec2 texCoords = v_tex0/u_holoMaxUV;
    vec3 nuv = vec3(texCoords.xy, 0.0);

    vec4 rgb[3];
    for (int i=0; i < 3; i++) 
    {
        nuv.z = (texCoords.x + i * u_holoSubp + texCoords.y * u_holoTilt) * u_holoPitch - u_holoCenter;
        nuv.z = mod(nuv.z + ceil(abs(nuv.z)), 1.0);
        nuv.z = (1.0 - invView) * nuv.z + invView * (1.0 - nuv.z);
        // maybe 1.00-y coords
        vec2 coords = texArr(nuv)*u_holoMaxUV;
        coords.y = 1.0 - coords.y;
        rgb[i] = texture(tex0, coords);
    }

    vec4 color = vec4(rgb[ri].r, rgb[1].g, rgb[bi].b, 1.0);
    FRAGCOLOR(color);
}
