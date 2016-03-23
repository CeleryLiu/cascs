<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <div class="row">
        <div class="col-xs-offset-1 col-xs-10">
            <p>中国科学院信息工程研究所物联网安全团队经过一年开发出针对工控设备的搜索引擎，
                提出两阶段过程的搜索方法在20小时内探测完整个网络空间保证了设备搜索的实时性，
                建立完整的工业控制设备指纹库保证设备识别的准确性，能够支持17种工控设备的搜索，
                找到14万余的工控设备。
            </p>

            <p>
                物联网安全团队于2015年8月初开始对整个工业控制系统进行网络普查，
                至今对Tradium Niagara Fox、Modbus、OMRON FINS、DNP3、General Electric
                SRTP、ProConOS、BACnet、PCWorx、EtherNet/IP、Siemnes S7、
                Mitsubishi MELSEC-Q、Codesys、Red Lion Crimson V3、HART-IP、IEC-104等工控协议进行了12次全网探测，详情见下表。
                <%--<a class="blue" href="#table1">表1</a>.--%>
            </p>

            <p>从结果来看，物联网安全团队开发的工业控制设备搜索引擎，无论在支持的工控协议还是发现的设备数量都与Shodan持平，
                并且很大程度上超过国内的ZoomEye，在该领域达到国内领先水平。</p>

            <div class="caption" id="table1" style="font-weight: bold; font-size: 1.8rem; margin: 2rem">表 1
                工业控制设备搜索结果汇总
            </div>
            <table class="table table-responsive table-stripped table-hover">
                <thead>
                <tr>
                    <th rowspan="2" style="border-right: 1px solid #e1e1e1">工控协议</th>
                    <%--<th rowspan="2">端口</th>--%>
                    <th colspan="2" class="iv">InfraView(CAS)</th>
                    <th colspan="2" class="ze">ZoomEye</th>
                    <th colspan="2" class="sd">Shodan</th>
                </tr>
                <tr>
                    <th>全球ICS数目</th>
                    <th>中国ICS数目</th>
                    <th>全球ICS数目</th>
                    <th>中国ICS数目</th>
                    <th>全球ICS数目</th>
                    <th>中国ICS数目</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Siemens S7</td>
                    <%--<td>TCP/102</td>--%>
                    <td class="iv">4416</td>
                    <td class="iv">251</td>
                    <td class="ze">1332</td>
                    <td class="ze">72</td>
                    <td class="sd">3191</td>
                    <td class="sd">76</td>
                </tr>
                <tr>
                    <td>Modbus</td>
                    <%--<td>TCP/502</td>--%>
                    <td class="iv">20313</td>
                    <td class="iv">1202</td>
                    <td class="ze">29371</td>
                    <td class="ze">271</td>
                    <td class="sd">13434</td>
                    <td class="sd">279</td>
                </tr>
                <tr>
                    <td>EtherNet/IP</td>
                    <%--<td>TCP/44818</td>--%>
                    <td class="iv">7189</td>
                    <td class="iv">78</td>
                    <td class="ze">2758</td>
                    <td class="ze">66</td>
                    <td class="sd">4207</td>
                    <td class="sd">58</td>
                </tr>
                <tr>
                    <td>BACnet</td>
                    <%--<td>UDP/47808</td>--%>
                    <td class="iv">389</td>
                    <td class="iv">20</td>
                    <td class="ze">1325</td>
                    <td class="ze">15</td>
                    <td class="sd">10439</td>
                    <td class="sd">8</td>
                </tr>
                <tr>
                    <td>Tridium Niagara Fox</td>
                    <%--<td>TCP/1911</td>--%>
                    <td class="iv">29017</td>
                    <td class="iv">263</td>
                    <td class="ze">14947</td>
                    <td class="ze">13</td>
                    <td class="sd">17556</td>
                    <td class="sd">19</td>
                </tr>
                <tr>
                    <td>Red Lion Crimson V3</td>
                    <%--<td>TCP/789</td>--%>
                    <td class="iv">3867</td>
                    <td class="iv">55</td>
                    <td class="ze">1333</td>
                    <td class="ze">226</td>
                    <td class="sd">1430</td>
                    <td class="sd">52</td>
                </tr>
                <tr>
                    <td>IEC 104</td>
                    <%--<td>TCP/2404</td>--%>
                    <td class="iv">301</td>
                    <td class="iv">37</td>
                    <td class="ze">308</td>
                    <td class="ze">7</td>
                    <td class="sd">224</td>
                    <td class="sd">34</td>
                </tr>
                <tr>
                    <td>DNP3</td>
                    <%--<td>TCP/20000</td>--%>
                    <td class="iv">14387</td>
                    <td class="iv">2315</td>
                    <td class="ze">29</td>
                    <td class="ze">3</td>
                    <td class="sd">15857</td>
                    <td class="sd">2245</td>
                </tr>
                <tr>
                    <td>OMRON FINS</td>
                    <%--<td>TCP/UDP/9600</td>--%>
                    <td class="iv">69</td>
                    <td class="iv">40</td>
                    <td class="ze">249</td>
                    <td class="ze">17</td>
                    <td class="sd">15817</td>
                    <td class="sd">3187</td>
                </tr>
                <tr>
                    <td>PCWorx</td>
                    <%--<td>TCP/1962</td>--%>
                    <td class="iv">4765</td>
                    <td class="iv">28</td>
                    <td class="ze">89</td>
                    <td class="ze">0</td>
                    <td class="sd">9249</td>
                    <td class="sd">2557</td>
                </tr>
                <tr>
                    <td>ProConOS</td>
                    <%--<td>TCP/20547</td>--%>
                    <td class="iv">4599</td>
                    <td class="iv">22</td>
                    <td class="ze">16</td>
                    <td class="ze">0</td>
                    <td class="sd">12143</td>
                    <td class="sd">2598</td>
                </tr>
                <tr>
                    <td>MELSEC-Q</td>
                    <%--<td>UDP/5006/5007</td>--%>
                    <td class="iv">94</td>
                    <td class="iv">78</td>
                    <td class="ze">13</td>
                    <td class="ze">0</td>
                    <td class="sd">951</td>
                    <td class="sd">88</td>
                </tr>
                <tr>
                    <td>Guardian AST Automatic Tank Gauge</td>
                    <%--<td>TCP/10001</td>--%>
                    <td class="iv">23762</td>
                    <td class="iv">977</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd">12666</td>
                    <td class="sd">820</td>
                </tr>
                <tr>
                    <td>CodeSys</td>
                    <%--<td>TCP/1200/2454</td>--%>
                    <td class="iv">5267</td>
                    <td class="iv">61</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd">3022</td>
                    <td class="sd">96</td>
                </tr>
                <tr>
                    <td>CSPV4 on AB PLC5 systems</td>
                    <%--<td>TCP/2222</td>--%>
                    <td class="iv">17788</td>
                    <td class="iv">2154</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd">24297</td>
                    <td class="sd">1045</td>
                </tr>
                <tr>
                    <td>HART-IP</td>
                    <%--<td>UDP/5094;TCP/20004</td>--%>
                    <td class="iv">52</td>
                    <td class="iv">17</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd">502</td>
                    <td class="sd">33</td>
                </tr>
                <tr>
                    <td>General Electric SRTP</td>
                    <%--<td>TCP 18245</td>--%>
                    <td class="iv">4733</td>
                    <td class="iv">36</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd">13088</td>
                    <td class="sd">2411</td>
                </tr>
                <tr class="tfooter" style="font-weight: bold">
                    <td>总计</td>
                    <%--<td></td>--%>
                    <td class="iv">141008</td>
                    <td class="iv">7634</td>
                    <td class="ze"></td>
                    <td class="ze"></td>
                    <td class="sd"></td>
                    <td class="sd"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>